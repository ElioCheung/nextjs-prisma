'use client'

import { useEffect, useState } from 'react'

type AlertProps = {
  state?: 'Error' | 'Success'
  duration?: number
  content?: string | undefined
}

export default function Alert({ content, duration, state = 'Error' }: AlertProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let timerId: string | number | NodeJS.Timeout | undefined
    if (content) {
      setVisible(true)
      timerId = setTimeout(() => {
        setVisible(false)
      }, duration || 3000)
    }
    return () => {
      clearTimeout(timerId)
    }
  }, [content, setVisible, duration])

  if (!content || !visible) return null

  const computedClasses = state === 'Error' ?
    'absolute z-50 top-1/3 left-1/2 -translate-x-1/2 border border-red-400 shadow-2xl bg-white text-red-500 px-4 py-2 rounded-2xl'
    : 'absolute z-50 top-1/3 left-1/2 -translate-x-1/2 border border-green-400 shadow-2xl bg-white text-green-500 px-4 py-2 rounded-2xl'

  return (
    <div className={computedClasses}>
      <p>{content}</p>
    </div>
  )
}