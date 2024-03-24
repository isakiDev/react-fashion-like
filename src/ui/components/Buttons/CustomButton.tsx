type Props = React.ButtonHTMLAttributes<HTMLButtonElement>

export const CustomButton = ({ className, children, ...options }: Props) => {
  return (
    <button
      className={`bg-indigo-600 text-gray-100 ${className}`}
      {...options}
    >{children}</button>
  )
}
