import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { authRouter } from './routes/auth.js'
import { ENV } from './config/env.js'
import { corsOptions } from './config/cors.js'

dotenv.config()
const app = express()
const port = ENV.PORT

app.use(express.json())

app.use(cors(corsOptions))

app.use(authRouter)

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
})
