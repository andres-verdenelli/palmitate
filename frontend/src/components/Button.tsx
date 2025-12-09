type ButtonProps = React.ComponentProps<'button'>

export default function Button({ children, ...props }: ButtonProps) {
	return (
		<button
			{...props}
			className="rounded-lg border px-4 py-2 text-lg font-semibold hover:cursor-pointer"
		>
			{children}
		</button>
	)
}
