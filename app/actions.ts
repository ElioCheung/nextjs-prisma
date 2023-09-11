'use server'

import prisma from '@/common/prisma'
import { loginSchema } from '@/common/validation/auth'
import { User } from '@prisma/client'
import { verify } from 'argon2'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { ZodError } from 'zod'

export async function login(data: FormData) {
  try {
    const loginInput  = await loginSchema.parseAsync({
      email: data.get('email'),
      password: data.get('password'),
    })  
  
    const user = await prisma.user.findUnique({
      where: {
        email: loginInput.email,
      }
    })
  
    if (!user) {
      return {
        err: 'login:failed',
        msg: 'This account was not found.',
        data: null,
      }
    }
  
    if (!await verify(user.password, loginInput.password)) {
      return {
        err: 'login:failed',
        msg: 'Wrong password or account number',
        data: null,
      }
    }
    
    revalidatePath('/')
    return {
      err: 'login:ok',
      msg: '',
      data: user,
    }

  } catch (e) {
    if (e instanceof ZodError) {
      let msg: string = ''

      const { issues } = e
      for (const item of issues) {
        msg = item.message
        break
      }

      return {
        err: 'login:failed',
        msg: msg,
        data: null,
      }
    }

    if (e instanceof Error) {
      return {
        err: 'login:failed',
        msg: e.message,
        data: null,
      }
    }
  }
} 