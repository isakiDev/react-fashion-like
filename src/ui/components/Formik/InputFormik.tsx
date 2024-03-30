import { Field } from 'formik'

type Props = React.InputHTMLAttributes<HTMLInputElement>

export const InputFormik = ({
  className = ' py-2 px-4 rounded-full border bg-gray-50',
  ...props
}: Props) => {
  return (
    <Field className={className}{...props}/>
  )
}
