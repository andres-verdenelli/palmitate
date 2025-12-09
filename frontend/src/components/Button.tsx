type ButtonProps = React.ComponentProps<'button'>

export default function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className='border px-4 py-2 rounded-lg font-semibold text-lg  hover:cursor-pointer   '
    >
      {children}
    </button>
  )
}
