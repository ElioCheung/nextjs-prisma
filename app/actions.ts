'use server'
import 'server-only'

import prisma from '@/common/prisma'
import { loginSchema, updateSchema, signUpSchema } from '@/common/validation/auth'
import { verify, hash } from 'argon2'
import { revalidatePath } from 'next/cache'
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

export async function updateUser(data: FormData) {
  try {
    const updateInput = await updateSchema.parseAsync({
      id: data.get('id'),
      name: data.get('name'),
      email: data.get('email'),
    })

    const user = await prisma.user.findUnique({
      where: {
        email: updateInput.email,
        AND: {
          id: {
            not: updateInput.id,
          }
        }
      },
    })

    if (user) {
      return {
        err: 'update:failed',
        msg: 'Duplicate email address.',
        data: null,
      }
    }

    const newUser = await prisma.user.update({
      where: {
        id: updateInput.id,
      },
      data: {
        name: updateInput.name,
        email: updateInput.email,
      }
    })

    revalidatePath('/')
    return {
      err: 'update:ok',
      msg: '',
      data: {
        id: newUser.id,
      },
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

export async function signup(data: FormData) {
  try {
    const signupInput  = await signUpSchema.parseAsync({
      name: data.get('name'),
      email: data.get('email'),
      password: data.get('password'),
      passwordConfirm: data.get('confirmPassword'),
    }) 

    const user = await prisma.user.findUnique({
      where: {
        email: signupInput.email,
        OR: [
          {
            name: {
              equals: signupInput.name,
            }
          }
        ]
      },
    })
  
    if (user) {
      return {
        err: 'signup:failed',
        msg: 'Duplicate email address.',
        data: null,
      }
    }

    const newUser = await prisma.user.create({
      data: {
        name: signupInput.name,
        email: signupInput.email,
        password: await hash(signupInput.password),
      }
    })

    return {
      err: 'signup:ok',
      msg: '',
      data: {
        ...newUser,
      }
    }
  } catch (e) {
    if (e instanceof ZodError) {
      let msg: string = ''

      const { issues } = e
      for (const item of issues) {
        msg = item.message
        break
      }
      console.log(issues)

      return {
        err: 'signup:failed',
        msg: msg,
        data: null,
      }
    }

    if (e instanceof Error) {
      return {
        err: 'signup:failed',
        msg: e.message,
        data: null,
      }
    }
  }
}