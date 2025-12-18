import { Router } from 'express'
import { requireAuth } from '../middleware/requireAuth.js'
import { login, me, signup } from '../controllers/authController.js'

export const authRouter: Router = Router()

authRouter.post('/signup', signup)

authRouter.post('/login', login)

authRouter.get('/me', requireAuth, me)
