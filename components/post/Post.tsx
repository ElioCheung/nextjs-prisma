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
    <Link href={`/post/${post.id}`} className='p-8'>
      <h2>{post.title}</h2>
      <small>{authorName}</small>
    </Link>
  )
}