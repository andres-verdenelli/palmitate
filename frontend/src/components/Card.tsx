type CardProps = React.HTMLAttributes<HTMLDivElement>

export default function Card({ children, ...props }: CardProps) {
	return (
		<div className="rounded-2xl border border-neutral-200 p-8 shadow-lg" {...props}>
			{children}
		</div>
	)
}
