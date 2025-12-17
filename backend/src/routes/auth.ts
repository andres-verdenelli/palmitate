import { Router } from 'express'
import { createUser, selectUserByEmail } from '../db/queries/users.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { ENV } from '../config/env.js'
import { users } from '../db/schema.js'
import { db } from '../db/index.js'
import { requireAuth } from '../middleware/requireAuth.js'

export const authRouter: Router = Router()

authRouter.post('/signup', async (req, res) => {
	const { email, password } = req.body

	if (!email || !password) {
		return res.status(400).json({ error: 'email and password required' })
	}

	try {
		const existingUser = await selectUserByEmail(email)

		if (existingUser) {
			return res.status(409).json({ error: 'User already exists' })
		}

		const hashedPassword = await bcrypt.hash(password, 10)

		const createdUser = await createUser(email, hashedPassword)

		if (!createdUser) {
			return res.status(400).json({ error: 'User not created' })
		}

		console.log('✓ Inserted user:', createdUser)
		return res
			.status(201)
			.json({ message: 'User created', email: createdUser.email })
	} catch (error) {
		console.error('x DB Insert Error: ', error)

		return res.status(500).json({ error: 'Error creating user' })
	}
})

authRouter.post('/login', async (req, res) => {
	const { email, password } = req.body
	if (!email || !password) {
		return res.status(400).json({ error: 'email and password required' })
	}

	try {
		const user = await selectUserByEmail(email)

		if (!user) {
			return res.status(404).json({ error: 'Invalid Email' })
		}

		const isPasswordValid = await bcrypt.compare(password, user.password)

		if (!isPasswordValid) {
			return res.status(401).json({ error: 'Invalid Password' })
		}

		const token = jwt.sign(
			{
				id: user.id,
				email: user.email,
			},
			ENV.JWT_SECRET,
			{
				expiresIn: '15m',
			},
		)

		return res.status(200).json({
			message: 'Login successful',
			token,
		})
	} catch (error) {
		console.error('Login Error', error)
		return res.status(500).json({ error: 'Database error' })
	}
})

authRouter.delete('/deleteUsers', async (_req, res) => {
	try {
		const deleted = await db.delete(users).returning()

		return res
			.status(200)
			.json({ message: `Deleted ${deleted.length} users. Accounts ${deleted}` })
	} catch (error) {
		console.error('Delete error: ', error)
		return res.status(500).json({ error: 'Database error' })
	}
})

authRouter.get('/me', requireAuth, (req, res) => {
	//@ts-expect-error user podria no existir
	const user = req.user
	return res.json({ user })
})
