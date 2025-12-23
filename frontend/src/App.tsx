import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header'
import Login from './components/Login'
import Signup from './components/Signup'
import type { AuthState, View } from './types/auth'

function App() {
	const [auth, setAuth] = useState<AuthState>({ token: null, email: null })
	const [view, setView] = useState<View>('landing')

	function NoteList() {
		const [notes, setNotes] = useState<[]>([])
		useEffect(() => {
			fetchNotes()
		}, [])

		const fetchNotes = async () => {
			const data = await fetch('http://localhost:3000/notes', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${auth.token}`,
				},
			})

			const json = await data.json()
			setNotes(json.notes)
			console.log(json)
		}

		return (
			<>
				{notes ?
					notes.map(note => <li key={note.id}>{note.text}</li>)
				:	<h1>There no notes</h1>}
			</>
		)
	}

	return (
		<>
			<Header
				isAuthenticated={!!auth.token}
				email={auth.email}
				onLoginClick={() => setView('login')}
				onHomeClick={() => setView('landing')}
				onSignUp={() => setView('signup')}
				onLogOut={() => {
					setAuth({ token: null, email: null })
					setView('landing')
				}}
			/>
			<main className='flex justify-center p-10'>
				{view === 'landing' && (
					<div className='flex justify-center'>
						<h1 className='text-2xl font-bold'>Welcome to the new World!</h1>
					</div>
				)}
				{view === 'login' && (
					<Login
						setAuth={setAuth}
						setView={setView}
					/>
				)}
				{view === 'signup' && <Signup />}

				{auth.token && <NoteList />}
			</main>
		</>
	)
}

export default App
