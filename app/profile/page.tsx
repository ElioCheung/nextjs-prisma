'use client'
import Alert from '@/components/alert/Alert'
import { User } from '@prisma/client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { updateUser } from '../actions'
import { redirect } from 'next/navigation'
import { RedirectType } from 'next/dist/client/components/redirect'

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
      <form ref={form} className='w-full flex flex-col items-center' action={updateAction}>
        <header className='text-2xl font-blod w-1/2'>
          Profile
        </header>
        <input name='id' type='text' required readOnly className='hidden' />
        <div className='w-1/2 p-5 flex items-center justify-center'>
          <label className='w-24 text-gray-400' htmlFor="name">Name</label>
          <input id='name' name='name' type='text' required className='form-input flex-1 rounded-lg' placeholder='Please Enter Name' />
        </div>
        <div className='w-1/2 p-5 flex items-center justify-center'>
          <label className='w-24 text-gray-400' htmlFor="email">Email</label>
          <input id='email' name='email' type='email' required className='form-input flex-1 rounded-lg' placeholder='Please Enter Email' />
        </div>
        <div className='w-1/2 p-5 flex items-center'>
          <label className='w-24 text-gray-400'></label>
          <div className='flex-1'>
            <button
              type='submit'
              className='text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-200 rounded-xl p-2'
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </main>
  )
}