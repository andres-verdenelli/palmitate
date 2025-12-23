import type { RequestHandler } from 'express'
import {
	createNote as createNoteQuery,
	deleteNoteById,
	getNoteById,
	getNotesByUserId,
	updateNoteById,
} from '../db/queries/notes.js'

export const createNote: RequestHandler = async (req, res) => {
	const { title, text } = req.body

	if (!title || !text) {
		return res.status(400).json({ error: 'Title and text required' })
	}

	const userId = req.user?.id

	if (!userId) {
		return res.status(400).json({ error: 'Internal error bro' })
	}

	try {
		const note = await createNoteQuery(userId, title, text)
		if (!note) {
			return res.status(400).json({ error: 'error creating note' })
		}
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { id, ...publicNote } = note
		return res.status(201).json({ message: 'Note created', publicNote })
	} catch (error) {
		console.error('Error creating note', error)
		return res.status(400).json({ error: 'Error creating note' })
	}
}

export const getNote: RequestHandler = async (req, res) => {
	const noteId = req.params['id']

	if (!noteId) {
		return res.status(400).json({ error: 'Missing id' })
	}

	const userId = req.user?.id

	if (!userId) {
		return res.status(400).json({ error: 'Internal error bro' })
	}

	try {
		const note = await getNoteById(userId, noteId)
		if (!note) {
			return res.status(404).json({ message: 'Note not found' })
		}
		return res.status(200).json({ message: 'note found', note })
	} catch (error) {
		console.error('Error', error)
		return res.status(400).json({ error: 'Error getting note' })
	}
}

export const getNotes: RequestHandler = async (req, res) => {
	const userId = req.user?.id

	if (!userId) {
		return res.status(400).json({ error: 'Internal error bro' })
	}
	try {
		const notes = await getNotesByUserId(userId)
		if (notes.length === 0) {
			return res.status(200).json({ message: 'there no notes' })
		}
		return res.status(200).json({ message: 'Notes', notes })
	} catch (error) {
		console.error('Error', error)
		return res.status(400).json({ error: "Error getting user's notes" })
	}
}

export const deleteNote: RequestHandler = async (req, res) => {
	const noteId = req.params['id']

	if (!noteId) {
		return res.status(400).json({ error: 'Missing id' })
	}
	const userId = req.user?.id

	if (!userId) {
		return res.status(400).json({ error: 'Internal error bro' })
	}

	try {
		const deletedNote = await deleteNoteById(noteId, userId)
		if (!deletedNote) {
			return res.status(404).json({ error: 'Note not found' })
		}
		return res
			.status(200)
			.json({ message: 'Note delete succesfull', deletedNote })
	} catch (error) {
		console.error('Error deleteing note', error)
		return res.status(400).json({ error: 'Error deleteing note' })
	}
}

export const editNote: RequestHandler = async (req, res) => {
	const noteId = req.params['id']
	if (!noteId) {
		return res.status(400).json({ error: 'there is not note id param' })
	}

	const userId = req.user?.id

	if (!userId) {
		return res.status(400).json({ error: ' there is not user id' })
	}

	const { title, text } = req.body

	if (!title || !text) {
		return res.status(400).json({ error: 'Title and text required' })
	}

	try {
		const updatedNote = await updateNoteById(noteId, userId, title, text)
		if (!updatedNote) {
			return res.status(400).json({ error: 'error updating or finding note' })
		}
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { id, createdAt, ...note } = updatedNote

		return res.status(200).json({ message: 'note updated', note: note })
	} catch (error) {
		console.error('error updating note', error)
		return res.status(400).json({ error: 'something went wrong updating note' })
	}
}
