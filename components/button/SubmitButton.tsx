'use client'

import { experimental_useFormStatus as useFormStatus } from 'react-dom'

type SubmitButtonProps = {
  btnText: string,
  className?: string,
}

export default function SubmitButton({ btnText, className }: SubmitButtonProps) {

  const { pending } = useFormStatus()

  const classes = className ? className : `hover:bg-violet-100 borde rounded-full px-4 py-2 mr-4 border-0 bg-violet-50 text-violet-700`

  return (
    <input
      className={classes}
      type='submit'
      disabled={pending}
      value={pending ? `${btnText}...` : `${btnText}`}
    />
  )
}