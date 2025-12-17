import { Router } from 'express'
import { requireAuth } from '../middleware/requireAuth.js'
import {
	createNote,
	deleteNoteById,
	getNoteById,
	getNotesByUserId,
} from '../db/queries/notes.js'

export const notesRouter: Router = Router()

notesRouter.use(requireAuth)

notesRouter.post('/notes', async (req, res) => {
	const { title, text } = req.body

	if (!title || !text) {
		return res.status(400).json({ error: 'Title and text required' })
	}

	//@ts-expect-error esta incluido, cree en mi xD
	const userId = req.user?.id

	if (!userId) {
		return res.status(400).json({ error: 'Internal error bro' })
	}

	try {
		const note = await createNote(userId, title, text)
		return res.status(201).json({ message: 'Note created', note })
	} catch (error) {
		console.error('Error creating note', error)
		return res.status(400).json({ error: 'Error creating note' })
	}
})

notesRouter.get('/notes/:id', async (req, res) => {
	const noteId = req.params.id
	//@ts-expect-error esta incluido, cree en mi
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
})

notesRouter.get('/notes', async (req, res) => {
	//@ts-expect-error esta incluido, cree en mi
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
})

notesRouter.delete('/notes/:id', async (req, res) => {
	//@ts-expect-error esta inlcuido
	const userId = req.user?.id
	const noteId = req.params.id

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
})

// notesRouter.put('/notes/:id', async (req, res) => {})
