'use client'

import Link from 'next/link'
import { User } from '@prisma/client'
import { useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

type UserLinkProps = {
  userId: string
}

export default function UserLink({ userId }: UserLinkProps) {
  const pathname = usePathname()
  const reserachParams = useSearchParams()
  const timeStamp = reserachParams?.get('u')

  const [user, setUser] = useState<User>()

  useEffect(() => {
    fetch(`/api/user/${userId}`)
      .then(res => res.json())
      .then(res => setUser(res))
  }, [pathname, timeStamp, userId])

  return (
    <>
      {user && <Link href='/profile' className='text-lg text-gray-600 hover:text-blue-600 mr-2'>{user.name}</Link>}
    </>
  )
}