import type { CorsOptions } from 'cors'

const allowedOrigins = [
	'http://localhost:5173',
	'http://127.0.0.1:5173',
	'http://192.168.101.21:5173',
]
export const corsOptions: CorsOptions = {
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
