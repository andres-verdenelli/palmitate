import { and, eq } from 'drizzle-orm'
import { db } from '../index.js'
import { notes } from '../schema.js'

export async function createNote(userId: string, title: string, text: string) {
	const [note] = await db
		.insert(notes)
		.values({ userId, title, text })
		.returning()

	return note || null
}

export async function getNotesByUserId(userId: string) {
	const note = await db.select().from(notes).where(eq(notes.userId, userId))

	return note
}

export async function getNoteById(userId: string, noteId: string) {
	const [note] = await db
		.select()
		.from(notes)
		.where(and(eq(notes.userId, userId), eq(notes.id, noteId)))

	return note || null
}

export async function updateNoteById(
	noteId: string,
	userId: string,
	title: string,
	text: string,
) {
	const [note] = await db
		.update(notes)
		.set({
			title,
			text,
		})
		.where(and(eq(notes.id, noteId), eq(notes.userId, userId)))
		.returning()

	return note || null
}

export async function deleteNoteById(noteId: string, userId: string) {
	const [note] = await db
		.delete(notes)
		.where(and(eq(notes.id, noteId), eq(notes.userId, userId)))
		.returning()

	return note || null
}
