import Button from './Button'

type HeaderProps = React.ComponentProps<'header'> & {
  isAuthenticated: boolean
  email: string | null
  onLoginClick: () => void
  onHomeClick: () => void
  onSignUp: () => void
  onLogOut: () => void
}

export default function Header({
  isAuthenticated,
  email,
  onLoginClick,
  onHomeClick,
  onSignUp,
  onLogOut,
}: HeaderProps) {
  return (
    <header className='p-4 flex justify-between border-b items-center'>
      <div
        className='hover:cursor-pointer'
        onClick={onHomeClick}
      >
        <h1 className='text-2xl font-bold'>Palmitate</h1>
      </div>
      <div className='flex gap-2 items-center'>
        {isAuthenticated ?
          <>
            <p>{email}</p>
            <Button onClick={onLogOut}>Log Out</Button>
          </>
        : <>
            <Button onClick={onLoginClick}>Log In</Button>
            <Button onClick={onSignUp}>Sign Up</Button>
          </>
        }
      </div>
    </header>
  )
}
