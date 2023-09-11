import prisma from '@/common/prisma'
import Post from '@/components/post/Post'
import { Suspense } from 'react'

async function getPosts() {
  const posts = await prisma.post.findMany({
    where: {
      published: true,
    },
    include: {
      author: true,
    }
  })

  return posts
}


export default async function Home() {
  const posts = await getPosts()

  return (
    <Suspense fallback={<p>Loading...</p>}>
      {
        posts.length ? (
          posts.map(post => <Post post={post} key={post.id} />)
        ) : (
          <div className='flex-1 flex items-center justify-center'>
            <p className='text-2lg text-gray-400'>No Data</p>
          </div>
        )
      }
    </Suspense>
  )
}
