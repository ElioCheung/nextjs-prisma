import { PropsWithChildren } from 'react'
import Image from 'next/image'
import Menu from './Menu'

import logo from '@/public/next.svg'

export default function Header({ children }: PropsWithChildren) {
  return (
    <header className='h-16 inline-flex items-center justify-between border shadow-lg px-4'>
      <div className='inline-flex'>
        <Image
          src={logo}
          alt='nextjs logo'
          width={100}
          style={{ height: 'auto' }}
        />
        <h1 className='ml-2 font-bold text-lg'>Prisma Demo</h1>
      </div>
      <div className='flex-1 pl-5'>
        {
          children ?
            children :
            <Menu />
        }
      </div>
    </header>
  )
}