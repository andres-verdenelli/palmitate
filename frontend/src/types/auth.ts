export type AuthState = {
	token: string | null
	email: string | null
}

export type View = 'landing' | 'login' | 'signup' | 'dashboard'
