import { eq } from 'drizzle-orm'
import { db } from '../index.js'
import { users } from '../schema.js'

export async function selectUserByEmail(email: string) {
	const [selectedUser] = await db
		.select()
		.from(users)
		.where(eq(users.email, email))

	return selectedUser ?? null
}

export async function createUser(email: string, hashedPassword: string) {
	const [createdUser] = await db
		.insert(users)
		.values({ email, password: hashedPassword })
		.returning()

	return createdUser
}
