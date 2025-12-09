import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Login from './components/Login'
import Signup from './components/Signup'
import type { AuthState, View } from './types/auth'

function App() {
	const [auth, setAuth] = useState<AuthState>({ token: null, email: null })
	const [view, setView] = useState<View>('landing')

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
			</main>
		</>
	)
}

export default App
