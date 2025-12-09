type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export default function Input({ ...props }: InputProps) {
  return (
    <input
      {...props}
      className='border border-neutral-400 rounded-md outline-0 p-2 mb-6 focus:ring-2 focus:ring-blue-500'
    />
  )
}
