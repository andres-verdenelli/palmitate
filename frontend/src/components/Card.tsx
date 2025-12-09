type CardProps = React.HTMLAttributes<HTMLDivElement>

export default function Card({ children, ...props }: CardProps) {
  return (
    <div
      className='border-neutral-200 border rounded-2xl p-8  shadow-lg'
      {...props}
    >
      {children}
    </div>
  )
}
