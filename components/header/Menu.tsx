'use client'

import Link from 'next/link'
import { redirect, usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import UserLink from './UserLink'
import { RedirectType } from 'next/dist/client/components/redirect'

export default function Menu() {
  const pathname = usePathname()

  const reserachParams = useSearchParams()
  const timeStamp = reserachParams?.get('u')

  const computedClasses = (pn: string) => pn === pathname ? 'text-lg text-blue-700 hover:text-blue-600 mr-2' : 'text-lg text-blue-400 hover:text-blue-600 mr-2'

  const [authroized, setAuthroized] = useState(false)
  const [id, setId] = useState('')

  useEffect(() => {
    console.log('[Menu Component Effects]: ', timeStamp)
    setAuthroized(localStorage.getItem('isAuthorized') === 'true')
    setId(localStorage.getItem('userId') as string)
  }, [setAuthroized, setId, pathname, timeStamp])

  const signout = () => {
    localStorage.setItem('isAuthorized', 'false')
    localStorage.setItem('userId', '')
    setAuthroized(false)
    setId('')
    redirect('/', RedirectType.replace)
  }

  return (
    <nav className='w-full inline-flex items-center justify-between'>
      <div>
        <Link href='/' className={computedClasses('/')}>Blog</Link>
        {authroized && (
          <>
            <Link href='/create' className={computedClasses('/create')}>Create</Link>
            <Link href='/drafts' className={computedClasses('/drafts')}>Drafts</Link>
          </>
        )}
      </div >
      <div className='inline-flex items-center'>
        {
          authroized && id ?
            (
              <>
                <UserLink />
                <p className='text-lg text-gray-400 hover:text-blue-600 mr-2' onClick={signout}>SignOut</p>
              </>
            )
            :
            (
              <>
                <Link href='/signin' className={computedClasses('/signin')}>SignIn</Link>
                <Link href='/signup' className={computedClasses('/signup')}>SignUp</Link>
              </>
            )
        }

      </div>
    </nav >
  )
}