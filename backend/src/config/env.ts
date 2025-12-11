const JWT_SECRET = process.env['JWT_SECRET']
const DATABASE_URL = process.env['DATABASE_URL']
const PORT = process.env['PORT']

if (!JWT_SECRET) {
	throw new Error('Missing JWT_SECRET environment variable')
}

if (!DATABASE_URL) {
	throw new Error('Missing DATABASE_URL environment variable')
}

if (!PORT) {
	throw new Error('Missing PORT environment variable')
}

export const ENV = {
	JWT_SECRET,
	DATABASE_URL,
	PORT,
}
