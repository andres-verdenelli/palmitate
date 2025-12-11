import jwt from 'jsonwebtoken'
import type { Request, Response, NextFunction } from 'express'
import { ENV } from '../config/env.js'

export function requireAuth(req: Request, res: Response, next: NextFunction) {
	const authHeader = req.headers.authorization

	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return res.status(401).json({ message: 'Missing or invalid token' })
	}

	const token = authHeader.split(' ')[1]

	if (!token) {
		return res.status(401).json({ message: 'Invalid token' })
	}

	try {
		const decoded = jwt.verify(token, ENV.JWT_SECRET)

		// attach the user info to the request
		// @ts-expect-error: we extend the request on purpose
		req.user = decoded

		return next()
	} catch (error) {
		console.log('Error', error)
		return res.status(401).json({ message: 'Invalid token' })
	}
}
