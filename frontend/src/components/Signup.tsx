import { useState } from 'react'
import Button from './Button'
import Card from './Card'
import Input from './Input'
import Label from './Label'

export default function Signup() {
	const [form, setForm] = useState({ email: '', password: '' })

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		const { email, password } = form

		try {
			const res = await fetch('http://localhost:3000/signup', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password }),
			})

			const data = await res.json()
			console.log('Frontend response:', data)
		} catch (error) {
			console.error('Frontend error:', error)
		}
	}
	return (
		<Card>
			<h1 className="pb-4 text-3xl font-bold">Sign Up</h1>
			<form className="flex flex-col" onSubmit={handleSubmit}>
				<Label htmlFor="email">Email</Label>
				<Input
					type="email"
					name="email"
					id="email"
					required
					value={form.email}
					onChange={event => setForm(prev => ({ ...prev, email: event.target.value }))}
				/>

				<Label htmlFor="password">Password</Label>

				<Input
					type="password"
					name="password"
					id="password"
					required
					value={form.password}
					onChange={event => setForm(prev => ({ ...prev, password: event.target.value }))}
				/>

				<Button type="submit">Sign Up</Button>
			</form>
		</Card>
	)
}
