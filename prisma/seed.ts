import { Prisma, PrismaClient } from '@prisma/client'
import { hash } from 'argon2'

const prisma = new PrismaClient()

const users: Prisma.UserCreateInput[] = [
  {
    name: 'elio',
    email: 'elio@gmail.com',
    password: '',
  },
  {
    name: 'cheung',
    email: 'cheung@gamil.com',
    password: '',
  },
]

async function main() {
  console.log('[Prisma Init]: Start seeding...')
  for (const u of users) {
    const user = await prisma.user.create({
      data: {
        ...u,
        password: await hash('12345678'),
      }
    })

    console.log(`[Prisma Init]: Created user with id: ${user.id}`)
  }
  console.log(`[Prisma Init]: Seeding finished.`)
}

main()
  .then(async() => {
    await prisma.$disconnect()
  })
  .catch(async(e) => {
    console.error('[Prisma Init]:', e)
    await prisma.$disconnect()
    process.exit(1)
  })