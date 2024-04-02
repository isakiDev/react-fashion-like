import { useEffect, useState } from 'react'
import DataTable, { type TableColumn } from 'react-data-table-component'

import { CardPostHeader, usePosts } from '../../posts'
import { EyeIcon, Modal, TrashIcon } from '../../ui'
import { type PostsResponse } from '../../types'

export const AdminPostsPage = () => {
  const { posts, onGetPosts, onDeletePost } = usePosts()

  const [isOpenModal, setIsOpenModal] = useState(false)
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
      cell: row => <button className='text-red-600 hover:text-red-500' onClick={async () => await onDeletePost(row.id)} type='button'><TrashIcon/></button>,
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
    setIsOpenModal(true)
  }

  return (
    <section className="flex flex-col p-2 w-full">
      { isOpenModal && currentPost && (
        <Modal
          onToggleModal={() => setIsOpenModal(!isOpenModal)}
        >
          <div className='flex flex-col'>
            <CardPostHeader
              date={currentPost?.createdAt}
              description={currentPost?.description}
              name={currentPost?.user?.name}
              url={currentPost?.user?.image}
            />

            <img className='p-4 object-contain max-h-[300px]' src={currentPost.image} />
          </div>
        </Modal>
      )}

      <div>
        <DataTable
          columns={columns}
          data={data}
          fixedHeader
          pagination
          title='User posts'
        />
      </div>
    </section>
  )
}
