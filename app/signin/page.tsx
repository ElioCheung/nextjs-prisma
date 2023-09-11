'use client'

import SubmitButton from '@/components/button/SubmitButton';
import { login } from '../actions'
import Alert from '@/components/alert/Alert';
import { useState } from 'react';
import { redirect } from 'next/navigation';
import { RedirectType } from 'next/dist/client/components/redirect';

export default function Signin() {
  const [msg, setMsg] = useState('')
  const [status, setStatus] = useState<'Error' | 'Success'>('Error')

  const loginAction = async (data: FormData) => {
    const res = await login(data)
    if (res && res.err === 'login:failed') {
      setMsg(res.msg as string)
      setStatus('Error')
    } else {
      setMsg('Login Successfully')
      setStatus('Success')
      localStorage.setItem('isAuthorized', 'true')
      localStorage.setItem('userId', res?.data ? res?.data.id : '')
      redirect('/', RedirectType.replace)
    }
  }

  return (
    <>
      <Alert content={msg} state={status} />
      <form
        action={loginAction}
        className='flex-1 flex flex-col items-center justify-center'
      >
        <header className='text-2xl font-blod w-1/2'>Please Login</header>
        <div className='w-1/2 p-5 flex items-center justify-center'>
          <label className='w-24 text-gray-400' htmlFor="email">Email</label>
          <input id='email' name='email' type='email' required className='form-input flex-1 rounded-lg' placeholder='Please Enter Email' />
        </div>
        <div className='w-1/2 p-5 flex items-center justify-center'>
          <label className='w-24 text-gray-400' htmlFor='password'>Password</label>
          <input id='password' name='password' type="password" required className='form-input flex-1 rounded-lg' placeholder='Please Enter Password' />
        </div>
        <div className='w-1/2 p-5 flex items-center'>
          <label className='w-24 text-gray-400'></label>
          <SubmitButton
            btnText='Sign In'
            className='hover:bg-violet-100 borde rounded-full px-4 py-2 border-0 bg-violet-50 text-violet-700 flex-1'
          />
        </div>
      </form>
    </>
  )
}