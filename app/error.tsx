'use client'

import { useEffect } from 'react'

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('[Error Page]', error)
  }, [error])

  return (
    <div className='flex-1 flex flex-col items-center justify-center'>
      <h1 className='text-2xl text-gray-900 py-5'>Opps, Something went wrong!</h1>
      <h2 className='text-lg text-gray-500 py-6'>{error.message}</h2>
      <button
        className='w-36 hover:bg-red-100 borde rounded-full px-4 py-2 mr-4 border-0 bg-red-50 text-red-700'
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  )
}