import { type FormEvent, useRef, useState } from 'react'
import { toast } from 'sonner'

import { CloseIcon, CustomButton, ImageIcon, Modal, UserImage } from '../../ui'
import { type User } from '../../types'
import { usePosts } from '..'
import { useModal } from '../../ui/hooks/useModal'

interface Props {
  user: User
}

export const PostCreatorBox = ({ user }: Props) => {
  const { onCreatePost } = usePosts()

  const [isSubmitted, setIsSubmitted] = useState(false)
  const { isOpenModal, toggleModal } = useModal()

  const fileSelectRef = useRef<HTMLInputElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  const handleClickSelectImage = () => {
    if (!fileSelectRef.current) return
    fileSelectRef.current?.click()
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setIsSubmitted(true)

    const fields = new window.FormData(e.target as HTMLFormElement)
    const description = fields.get('description')?.toString()
    // const file = fields.get('file') as File

    if (!description || description?.trim().length <= 0) {
      setIsSubmitted(false)
      return toast.error('Invalid description')
    }

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    showInputImage(e.target)
  }

  const showInputImage = (input: HTMLInputElement) => {
    if (input.files && input.files[0]) {
      const reader = new FileReader()

      reader.onload = (e) => {
        if (imgRef.current) {
          imgRef.current.src = e.target!.result as string
        }
      }

      reader.readAsDataURL(input.files[0])
    }
  }

  return (
    <section className='flex gap-2 bg-white p-4 rounded-md shadow-sm'>
      <UserImage alt='User image' className='h-9 w-9 ' src={user?.image} />

      <button className='flex-1 text-gray-400  bg-gray-200 border text-gray border-gray-400 rounded-full text-start pl-4' onClick={toggleModal}>Create post</button>

      {isOpenModal &&
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
              title='Close modal'
              type='button'
            >
              <CloseIcon />
            </button>

          </header>

          <form onSubmit={handleSubmit}>
            <textarea
              className='w-full outline-none resize-none bg-gray-50'
              name='description'
              placeholder={'What do you want to talk about?'} rows={10}
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
              <CustomButton
                className='disabled:bg-gray-300 rounded-full font-semibold px-4 py-1'
                disabled={isSubmitted}
              >Post</CustomButton>
            </div>

            <input
              className='hidden'
              name='file'
              onChange={handleChange}
              ref={fileSelectRef}
              type='file'
            />

            <img alt="Post image" className='pt-4 size-1/4' ref={imgRef} src="#" />

          </form>
        </Modal>
      }
    </section>
  )
}
