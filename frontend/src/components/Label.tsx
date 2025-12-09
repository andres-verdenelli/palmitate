type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>

export default function Label({ children, ...props }: LabelProps) {
	return (
		<label className="mb-2 text-neutral-500" {...props}>
			{children}
		</label>
	)
}
