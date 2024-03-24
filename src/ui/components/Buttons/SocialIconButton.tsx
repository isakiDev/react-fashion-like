type Props = React.ButtonHTMLAttributes<HTMLButtonElement>

export const SocialIconButton = ({ className, children, ...options }: Props) => {
  const styles = className ?? 'transition-transform transform hover:scale-110 duration-150 ease-in-out'

  return (
    <button
      className={styles}
      {...options}
    >{children}</button>
  )
}
