import { ErrorMessage } from 'formik'

interface Props {
  className?: string
  name: string
  component: string
}

export const ErrorMessageFormik = ({
  className = 'text-red-400',
  ...props
}: Props) => {
  return (
    <ErrorMessage
      className={className}
      {...props}
    />
  )
}
