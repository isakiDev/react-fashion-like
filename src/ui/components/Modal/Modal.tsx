interface Props {
  children: JSX.Element | JSX.Element[]
  onToggleModal: () => void
  className?: string
}

export const Modal = ({ children, className, onToggleModal }: Props) => {
  return (
    <>
      <div
        className='fixed inset-0 bg-slate-200/80 flex justify-center'
        onClick={onToggleModal}
      />

      <div className='fixed top-10 left-0 right-0 max-w-[500px] mx-auto z-10 overflow-y-auto h-screen px-4'>
        <div className={`bg-gray-50 shadow-lg rounded-lg ${className} `}>
          {children}
        </div>
      </div>
    </>
  )
}
