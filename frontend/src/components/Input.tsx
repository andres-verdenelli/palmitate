type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export default function Input({ ...props }: InputProps) {
	return (
		<input
			{...props}
			className="mb-6 rounded-md border border-neutral-400 p-2 outline-0 focus:ring-2 focus:ring-blue-500"
		/>
	)
}
