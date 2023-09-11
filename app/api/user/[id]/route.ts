import prisma from '@/common/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params
  
  const user = await prisma.user.findUnique({
    where: {
      id
    }
  })

  if (!user) {
    return NextResponse.json({
      err: 'get:user:failed',
      msg: 'No such person found'
    })
  }

  return NextResponse.json({
    ...user
  })
}