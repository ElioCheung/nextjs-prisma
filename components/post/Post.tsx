import type { Post, User } from '@prisma/client'
import Link from 'next/link'

type PostProps = {
  post: Post & {
    author: User | null
  }
}

export default function Post({ post }: PostProps) {
  const authorName = post.author ? post.author.name : 'Unknown author'

  return (
    <Link
      href={`/post/${post.id}`}
      className='p-2 hover:bg-violet-100 hover:cursor-pointer border-b-2 max-w-4xl w-full'
    >
      <h2 className='text-lg font-bold'>{post.title}</h2>
      <div className='w-full inline-flex justify-between'>
        <small>time: {post.updatedAt.toDateString() || post.createdAt.toDateString()}</small>
        <small>author: {authorName}</small>
      </div>
    </Link>
  )
}