import prisma from '@/common/prisma'

export async function generateStaticParams() {
  const posts = await prisma.post.findMany({
    where: {
      published: true,
    }
  })

  return posts.map(post => ({
    id: `${post.id}`
  }))
}

type PostDetailProps = {
  params: {
    id: string
  }
}

export default async function PostDetail({ params }: PostDetailProps) {
  const { id } = params
  const post = await prisma.post.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      author: true,
    }
  })
  if (!post) return null

  return (
    <main className='flex-1 flex flex-col items-center'>
      <div className='max-w-4xl w-full py-4'>
        <h1 className='font-bold text-2xl leading-8'>{post.title}</h1>
        <div className='w-full inline-flex justify-between items-center'>
          <small>Created: <strong>{post.updatedAt.toDateString()}</strong></small>
          <small>Author: <strong>{post.author?.name}</strong></small>
        </div>
        <hr className='my-3' />
        <section className='flex-1 p-2 leading-8'>
          {post.content}
        </section>
      </div>
    </main>
  )
}