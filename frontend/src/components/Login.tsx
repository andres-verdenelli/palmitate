import Button from './Button'
import Label from './Label'
import Input from './Input'
import { useState } from 'react'
import Card from './Card'
import type { AuthState, View } from '../types/auth'
type LoginProps = {
  setAuth: (authState: AuthState) => void
  setView: (view: View) => void
}

export default function Login({ setAuth, setView }: LoginProps) {
  const [form, setForm] = useState({ email: '', password: '' })
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErrorMessage('')
    const { email, password } = form

    try {
      const res = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()
      if (!!data?.error) {
        setErrorMessage(data.error)
      }

      if (data?.message === 'Login successful' && !!data?.token) {
        setAuth({
          token: data.token,
          email: form.email,
        })
        setView('dashboard')
      }
      console.log('Frontend response:', data)
    } catch (error) {
      console.error('Frontend error:', error)
    }
  }
  return (
    <Card>
      <h1 className='text-3xl font-bold pb-4'>Log in</h1>
      <form
        className='flex flex-col '
        onSubmit={handleSubmit}
      >
        <Label htmlFor='email'>Email</Label>
        <Input
          type='email'
          name='email'
          id='email'
          required
          value={form.email}
          onChange={event =>
            setForm(prev => ({ ...prev, email: event.target.value }))
          }
        />

        <Label htmlFor='password'>Password</Label>

        <Input
          type='password'
          name='password'
          id='password'
          required
          value={form.password}
          onChange={event =>
            setForm(prev => ({ ...prev, password: event.target.value }))
          }
        />

        <Button type='submit'>Log In</Button>
        {errorMessage && <h1 className='text-red-500 mt-4'>{errorMessage}</h1>}
      </form>
    </Card>
  )
}
