import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
	id: uuid('id').defaultRandom().primaryKey(),
	email: text('email').notNull().unique(),
	password: text('password').notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const notes = pgTable('notes', {
	id: uuid('id').defaultRandom().primaryKey(),
	userId: uuid('user_id')
		.notNull()
		.references(() => users.id, {
			onDelete: 'cascade',
		}),
	title: text('title').notNull(),
	text: text('text').notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
})
