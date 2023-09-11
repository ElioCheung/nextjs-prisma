'use client'

import Link from 'next/link'
import { User } from '@prisma/client'
import { useEffect, useState } from 'react'

type UserLinkProps = {
  userId: string
}

export default function UserLink({ userId }: UserLinkProps) {

  const [user, setUser] = useState<User>()

  useEffect(() => {
    fetch(`/api/user/${userId}`, { cache: 'no-store' })
      .then(res => res.json())
      .then(res => setUser(res))
  }, [userId])

  return (
    <>
      {user && <Link href='/profile' className='text-lg text-gray-600 hover:text-blue-600 mr-2'>{user.name}</Link>}
    </>
  )
}