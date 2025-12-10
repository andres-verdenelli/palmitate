import express from 'express'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import { eq } from 'drizzle-orm'
import { db } from './db/index.js'
import { users } from './db/schema.js'
import jwt from 'jsonwebtoken'
import { requireAuth } from './middleware/requireAuth.js'
import cors, { type CorsOptions } from 'cors'

const app = express()
const port = 3000
const allowedOrigins = [
	'http://localhost:5173',
	'http://127.0.0.1:5173',
	'http://192.168.101.21:5173',
]
const corsOptions: CorsOptions = {
	origin(origin, callback) {
		if (!origin) {
			return callback(null, true)
		}
		if (allowedOrigins.includes(origin)) {
			return callback(null, true)
		}
		console.warn('Bloked by CORS: ', origin)
		return callback(new Error('Not allowed by CORS'))
	},
}

dotenv.config()

app.use(express.json())

app.use(cors(corsOptions))

app.post('/signup', async (req, res) => {
	const { email, password } = req.body

	if (!email || !password) {
		return res.status(400).json({ error: 'email and password required' })
	}

	try {
		const hashedPassword = await bcrypt.hash(password, 10)

		const result = await db.insert(users).values({ email, password: hashedPassword }).returning()
		console.log('✓ Inserted user:', result)
		return res.status(201).json({ message: 'User created', mail: result[0]?.email })
	} catch (error) {
		console.error('x DB Insert Error: ', error)
		return res.status(500).json({ error: 'Database error' })
	}
})

app.post('/login', async (req, res) => {
	const { email, password } = req.body

	if (!email || !password) {
		return res.status(400).json({ error: 'email and password required' })
	}

	try {
		const [user] = await db.select().from(users).where(eq(users.email, email))

		if (!user) {
			return res.status(404).json({ error: 'Invalid Email' })
		}

		const foundUser = user

		const isPasswordValid = await bcrypt.compare(password, foundUser.password)

		if (!isPasswordValid) {
			return res.status(401).json({ error: 'Invalid Password' })
		}

		const token = jwt.sign(
			{
				id: foundUser.id,
				email: foundUser.email,
			},
			process.env.JWT_SECRET as string,
			{
				expiresIn: '1h',
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

app.delete('/deleteUsers', async (req, res) => {
	try {
		const deleted = await db.delete(users).returning()

		return res.status(200).json({ message: `Deleted ${deleted.length} users` })
	} catch (error) {
		console.error('Delete error: ', error)
		return res.status(500).json({ error: 'Database error' })
	}
})

app.get('/me', requireAuth, (req, res) => {
	//@ts-expect-error user podria no existir
	const user = req.user
	return res.json({ user })
})

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
})
