type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>

export default function Label({ children, ...props }: LabelProps) {
  return (
    <label
      className='text-neutral-500 mb-2 '
      {...props}
    >
      {children}
    </label>
  )
}
