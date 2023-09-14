'use client'

import Alert from '@/components/alert/Alert'
import Form, { FormItemProps } from '@/components/form/Form'
import { useRef, useState } from 'react'
import { signup } from '../actions'
import { redirect } from 'next/navigation'
import { RedirectType } from 'next/dist/client/components/redirect'

const formItems: FormItemProps[] = [
  {
    type: 'text',
    label: 'Name',
    key: 'name',
    placeholder: 'Please enter name',
    required: true,
  },
  {
    type: 'email',
    label: 'Email',
    key: 'email',
    placeholder: 'Please enter email',
    required: true,
  },
  {
    type: 'password',
    label: 'Password',
    key: 'password',
    placeholder: 'Please enter password',
    required: true,
  },
  {
    type: 'password',
    label: 'Confirm Password',
    key: 'confirmPassword',
    placeholder: 'Please enter password',
    required: true,
  }
]


export default function Signup() {
  const form = useRef<HTMLFormElement>(null)
  const [msg, setMsg] = useState('')
  const [status, setStatus] = useState<'Error' | 'Success'>('Error')

  const signupAction = async (data: FormData) => {
    const res = await signup(data)
    if (res && res.err === 'signup:failed') {
      setMsg(res.msg as string)
      setStatus('Error')
    } else {
      setMsg('Sign Up Successfully')
      setStatus('Success')
      localStorage.setItem('isAuthorized', 'true')
      localStorage.setItem('userId', res?.data ? res?.data.id : '')
      redirect('/', RedirectType.replace)
    }
  }

  return (
    <main className='flex-1 flex flex-col items-center justify-center p-3'>
      <Alert content={msg} state={status} />
      <Form ref={form} title='Sign Up' items={formItems} btnTxt='Submit' action={signupAction} />
    </main>
  )
}