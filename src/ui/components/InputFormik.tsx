import { Field } from 'formik'

type InputTypes = 'text' | 'password' | 'email'

interface Props {
  className?: string
  name: string
  type: InputTypes
  placeholder: string
}

export const InputFormik = ({
  className = 'p-2 rounded-md border bg-gray-50',
  ...props
}: Props) => {
  return (
    <Field
      className={className}
      {...props}
    />
  )
}
