'use client'

import Link from 'next/link'
import { User } from '@prisma/client'
import { useEffect, useState } from 'react'

export default function UserLink() {

  const [user, setUser] = useState<User>()

  useEffect(() => {
    const userId = localStorage.getItem('userId') as string
    fetch(`/api/user/${userId}`, { cache: 'no-store' })
      .then(res => res.json())
      .then(res => setUser(res))
  })

  return (
    <>
      {user && <Link href='/profile' className='text-lg text-gray-600 hover:text-blue-600 mr-2'>{user.name}</Link>}
    </>
  )
}