type FormHeaderProps = {
  title?: string
}

export default function FormHeader({ title }: FormHeaderProps) {
  if (!title) return null

  return (
    <>
      <header className='text-2xl font-blod w-1/2'>
        {title}
      </header>
    </>
  )
}