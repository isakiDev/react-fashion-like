import React, { useState } from 'react'

import { CloseIcon, CustomButton, EditIcon, Modal } from '../../ui'
import { type PostsResponse } from '../../types'
import { useModal } from '../../ui/hooks/useModal'
import { toast } from 'sonner'
import { usePosts } from '..'

interface Props {
  post: PostsResponse
}

export const CardPostActions = ({ post }: Props) => {
  const { image, user } = post

  const [showMenuActions, setShowMenuActions] = useState(false)
  const [description, setDescription] = useState(post.description)

  const { onUpdatePost } = usePosts()
  const { isOpenModal, toggleModal } = useModal()

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    toast.promise(onUpdatePost(post.id, description), {
      loading: 'Loading...',
      success: () => {
        closeActionsAndModal()
        return 'Updated post'
      },
      error: (error) => error.message
    })
  }

  const closeActionsAndModal = () => {
    toggleModal()
    setShowMenuActions(false)
  }

  return (
    <div className='flex flex-col ml-auto relative'>
      <button
        className='px-2 py-1 rounded-full hover:bg-gray-200 font-bold text-gray-600'
        onClick={() => setShowMenuActions(!showMenuActions)}
      >...</button>

      {showMenuActions && (
        <div
          className='fixed inset-0'
          onClick={() => setShowMenuActions(false)}
        ></div>
      )}

      <div className={`absolute ${!showMenuActions && 'hidden'} top-10 right-[1px] w-[100px] rounded-md bg-white shadow-lg py-1`}>
        <button
          className='flex items-center justify-center px-2 gap-2 w-full hover:bg-gray-100 font-semibold text-gray-600'
          onClick={closeActionsAndModal}
        ><EditIcon/>Edit</button>
      </div>

      {isOpenModal && (
        <Modal
          className='p-4 flex flex-col gap-8'
          onToggleModal={closeActionsAndModal}
        >
          <header className='flex gap-4'>
            <img
              alt='User image'
              className="object-cover h-14 w-1h-14 rounded-full"
              src={user?.image}
            />

            <h1 className='text-xl font-semibold text-gray-700'>{user?.name}</h1>

            <button
              className='flex flex-1 h-0 justify-end text-gray-500 hover:text-gray-700 hover:cursor-pointer'
              onClick={toggleModal}
              title='Close modal'
              type='button'
            >
              <CloseIcon />
            </button>

          </header>

          <form className='flex flex-col' onSubmit={handleSubmit}>
            <textarea
              className='w-full outline-none resize-none bg-gray-50'
              name='description'
              onChange={e => handleChange(e)} placeholder={description}
              rows={5}
              value={description}
            />

            {/* <div className='flex place-content-center'> */}
            <img alt="Post image" className='pt-4 size-1/2' src={image} />
            {/* </div> */}

            <div className='flex justify-end pt-4'>
              <CustomButton
                className='disabled:bg-gray-300 rounded-full font-semibold px-4 py-1'
              >Save</CustomButton>
            </div>
          </form>
        </Modal>
      )}

    </div>
  )
}
