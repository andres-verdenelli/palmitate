import { Router } from 'express'
import { requireAuth } from '../middleware/requireAuth.js'

import {
	createNote,
	deleteNote,
	getNote,
	getNotes,
} from '../controllers/notesController.js'

export const notesRouter: Router = Router()

notesRouter.use(requireAuth)

notesRouter.post('/notes', createNote)

notesRouter.get('/notes/:id', getNote)

notesRouter.get('/notes', getNotes)

notesRouter.delete('/notes/:id', deleteNote)

// notesRouter.put('/notes/:id', async (req, res) => {})
