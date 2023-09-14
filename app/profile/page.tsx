'use client'
import Alert from '@/components/alert/Alert'
import { User } from '@prisma/client'
import { useEffect, useRef, useState } from 'react'
import { updateUser } from '../actions'
import { redirect } from 'next/navigation'
import { RedirectType } from 'next/dist/client/components/redirect'
import Form, { FormItemProps } from '@/components/form/Form'

const formItems: FormItemProps[] = [
  {
    type: 'text',
    key: 'id',
    required: true,
    hidden: true,
    readOnly: false,
  },
  {
    type: 'text',
    label: 'Name',
    key: 'name',
    required: true,
    hidden: false,
    readOnly: false,
    placeholder: 'Please Enter Name'
  },
  {
    type: 'email',
    label: 'Email',
    key: 'email',
    required: true,
    hidden: false,
    readOnly: false,
    placeholder: 'Please Enter Email'
  }
]

export default function Profile() {
  const [msg, setMsg] = useState('')
  const [status, setStatus] = useState<'Error' | 'Success'>('Error')
  const form = useRef<HTMLFormElement>(null)
  const [user, setUser] = useState<User>()

  useEffect(() => {
    const id = localStorage.getItem('userId')
    fetch(`/api/user/${id}`)
      .then(res => res.json())
      .then(res => setUser({ ...res }))
  }, [])

  if (user && form.current) {
    const f = form.current as HTMLFormElement
    (f['id'] as unknown as HTMLInputElement).value = user.id

      ; (f['name'] as unknown as HTMLInputElement).value = user.name

      ; (f['email'] as unknown as HTMLInputElement).value = user.email
  }

  const updateAction = async (data: FormData) => {
    const res = await updateUser(data)
    if (res && res.err == 'update:failed') {
      setMsg(res.msg as string)
      setStatus('Error')
    } else {
      setMsg('Update User Successfully')
      setStatus('Success')
      // fix: 使用redirect时由于路由未变化，导致UserLink组件无法更新
      // window.location.reload()
      redirect(`/profile?u=${Date.now()}`, RedirectType.replace)
    }
  }

  return (
    <main className='flex-1 flex flex-col items-center justify-center p-3'>
      <Alert content={msg} state={status} />
      <Form ref={form} action={updateAction} title='Profile' btnTxt='Save' items={formItems} />
    </main>
  )
}