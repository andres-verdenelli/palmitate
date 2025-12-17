import express from 'express'
import cors from 'cors'
import { authRouter } from './routes/auth.js'
import { ENV } from './config/env.js'
import { corsOptions } from './config/cors.js'
import { notesRouter } from './routes/notes.js'

const app = express()
const port = ENV.PORT

app.use(express.json())

app.use(cors(corsOptions))

app.use(authRouter)

app.use(notesRouter)

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
})
