'use client'

import Alert from '@/components/alert/Alert'
import Form, { FormItemProps } from '@/components/form/Form'
import { useEffect, useState } from 'react'
import { createPost } from '../actions'
import { useRouter } from 'next/navigation'

const items: FormItemProps[] = [
  {
    type: 'text',
    label: 'Title',
    key: 'title',
    placeholder: 'Please enter title',
    required: true,
  },
  {
    type: 'textarea',
    label: 'Content',
    key: 'content',
    placeholder: 'Please enter content',
  },
  {
    type: 'checkbox',
    label: 'Published',
    key: 'published',
  }
]

export default function Create() {

  const [authorId, setAuthorId] = useState('')
  const [msg, setMsg] = useState('')
  const [status, setStatus] = useState<'Error' | 'Success'>('Error')
  const router = useRouter()

  useEffect(() => {
    const id = localStorage.getItem('userId') as string
    id && setAuthorId(id)
  }, [])

  const createPostAction = async (data: FormData) => {
    data.append('authorId', authorId)
    const res = await createPost(data)
    if (res && res.err === 'create:post:failed') {
      setMsg(res.msg as string)
      setStatus('Error')
    } else {
      setMsg('Created Successfully')
      setStatus('Success')
      res?.data && router.push(`/post/${res.data.id}`)
    }
  }

  return (
    <main className='flex-1 flex flex-col items-center justify-center p-3'>
      <Alert content={msg} state={status} />
      <Form title='Create Post' items={items} btnTxt='Submit' action={createPostAction} />
    </main>
  )
}