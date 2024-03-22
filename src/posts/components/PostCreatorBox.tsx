import { useBoundStore } from '../../store/bound.store'
import { CloseIcon, ImageIcon, Modal } from '../../ui/components'
import { type User } from '../../types'
import { type FormEvent, useRef, useState } from 'react'
import { usePosts } from '..'
import { toast } from 'sonner'

interface Props {
  user: User
}

export const PostCreatorBox = ({ user }: Props) => {
  const { onCreatePost } = usePosts()

  const toggleModal = useBoundStore(state => state.toggleState)
  const isModalOpen = useBoundStore(state => state.isOpen)

  const [isSubmitted, setIsSubmitted] = useState(false)

  const fileSelect = useRef<HTMLInputElement>(null)

  const text = 'What do you want to talk about?'

  const handleClickSelectImage = () => {
    fileSelect.current?.click()
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setIsSubmitted(true)

    const fields = new window.FormData(e.target as HTMLFormElement)
    const description = fields.get('description')?.toString()
    // const file = fields.get('file') as File

    if (!description || description?.trim().length <= 0) return toast.error('Invalid description')

    toast.promise(onCreatePost(fields), {
      loading: 'Creating post...',
      success: () => {
        toggleModal()
        return 'Post created'
      },
      error: (error) => error.message,
      finally: () => { setIsSubmitted(false) }
    })
  }

  return (
    <section className='flex gap-2 bg-white p-4 rounded-lg shadow-sm'>
      <img
        alt='User image'
        className="object-cover h-9 w-9 rounded-full"
        src={user?.image}
      />
      <button className='flex-1 text-gray-400  bg-gray-200 border text-gray border-gray-400 rounded-full text-start pl-4' onClick={toggleModal}>Create post</button>

      {isModalOpen &&
        <Modal
          className='p-4 flex flex-col gap-8'
          onToggleModal={toggleModal}
        >
          <header className='flex gap-4'>
            <img
              alt='User image'
              className="object-cover h-14 w-1h-14 rounded-full"
              src={user?.image}
            />

            <h1 className='text-xl font-semibold text-gray-700'>{user.name}</h1>

            <button
              className='flex flex-1 h-0 justify-end text-gray-500 hover:text-gray-700 hover:cursor-pointer'
              onClick={toggleModal}
            >
              <CloseIcon />
            </button>

          </header>

          <form onSubmit={handleSubmit}>
            <textarea
              className='w-full outline-none resize-none bg-gray-50'
              name='description'
              placeholder={text} rows={10}
            >
            </textarea>

            <button
              className='text-gray-500 hover:shadow-sm mb-4 bg-gray-200 hover:text-gray-700 rounded-full border p-2'
              onClick={handleClickSelectImage}
              title='Upload Image'
              type='button'
            ><ImageIcon /></button>

            <hr />

            <div className='flex justify-end pt-4'>
              <button
                className='disabled:bg-gray-300 px-5 py-1 rounded-full bg-blue-600 font-semibold text-gray-100'
                disabled={isSubmitted}
              >Post</button>
            </div>

            <input className='hidden' name='file' ref={fileSelect} type='file'/>
          </form>
        </Modal>
      }
    </section>
  )
}
