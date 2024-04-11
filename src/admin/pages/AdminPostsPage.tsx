import { useEffect, useState } from 'react'
import DataTable, { type TableColumn } from 'react-data-table-component'
import { toast } from 'sonner'

import { CardPostHeader, usePosts } from '../../posts'
import { CloseIcon, EyeIcon, Modal, TrashIcon } from '../../ui'
import { type PostsResponse } from '../../types'
import { useModal } from '../../ui/hooks/useModal'

export const AdminPostsPage = () => {
  const { posts, onGetPosts, onDeletePost } = usePosts()

  const { isOpenModal, toggleModal } = useModal()
  const [currentPost, setCurrentPost] = useState<PostsResponse | null>()

  useEffect(() => {
    onGetPosts()
  }, [])

  const data = posts?.map(({ id, user, createdAt }) => ({
    id,
    name: user?.name,
    email: user?.email,
    createdAt
  }))

  interface Columns {
    id: number
    name: string
    email: string
    createdAt: string
  }

  const columns: Array<TableColumn<Columns>> = [
    {
      name: 'ID',
      selector: row => row.id,
      sortable: true
    },
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true
    },
    {
      name: 'CreatedAt',
      selector: row => row.createdAt,
      sortable: true
    },
    {
      name: '',
      cell: row => <button className='text-red-600 hover:text-red-500' onClick={async () => await handleClickDeletePost(row.id)} type='button'><TrashIcon/></button>,
      width: '60px'
    },
    {
      name: '',
      cell: row => <button className='text-indigo-600 hover:text-indigo-500' onClick={() => handleClickViewPost(row.id)} type='button'><EyeIcon/></button>,
      width: '60px'
    }
  ]

  const handleClickViewPost = (postId: number) => {
    const post = posts?.find(post => post.id === postId)
    if (!post) return

    setCurrentPost(post)
    toggleModal()
  }

  const handleClickDeletePost = async (postId: number) => {
    const resp = window.confirm('Do you want to delete the post?')
    if (!resp) return

    toast.promise(onDeletePost(postId), {
      loading: 'Loading...',
      success: 'Post deleted',
      error: (error) => error.message
    })
  }

  return (
    <section className='w-full max-w-[1000px] mx-auto p-2'>
      {isOpenModal && currentPost && (
        <Modal
          className='flex flex-col'
          onToggleModal={toggleModal}
        >
          <header className='flex p-4 sticky top-0 bg-gray-50 rounded-t-lg'>
            <CardPostHeader post={currentPost}/>
            <button
              className='flex flex-1 h-0 justify-end text-gray-500 hover:text-gray-700 hover:cursor-pointer'
              onClick={toggleModal}
              title='Close modal'
              type='button'
            >
              <CloseIcon />
            </button>
          </header>

          <img className='p-4 object-contain max-h-[300px]' src={currentPost.image} />
        </Modal>
      )}

      <DataTable
        columns={columns}
        data={data}
        fixedHeader
        pagination
        responsive
        title='User posts'
      />
    </section>
  )
}
