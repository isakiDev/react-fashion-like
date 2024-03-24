import { Field } from 'formik'

type Props = React.InputHTMLAttributes<HTMLInputElement>

export const InputFormik = ({
  className = 'p-2 rounded-md border bg-gray-50',
  ...props
}: Props) => {
  return (
    <Field className={className}{...props}/>
  )
}
