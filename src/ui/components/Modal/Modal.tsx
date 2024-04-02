interface Props {
  children: JSX.Element | JSX.Element[]
  onToggleModal: () => void
  className?: string
}

export const Modal = ({ children, className, onToggleModal }: Props) => {
  return (
    <>
      <div
        className='absolute inset-0 bg-slate-200/80 flex justify-center'
        onClick={onToggleModal}
      />

      <div className='fixed left-0 right-0 max-w-[500px] mx-auto z-10'>
        <div className={`bg-gray-50 shadow-lg rounded-lg ${className} mx-4 lg:mx-0`}>
          {children}
        </div>
      </div>
    </>
  )
}
