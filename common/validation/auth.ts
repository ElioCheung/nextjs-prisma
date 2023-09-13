import { object, string, TypeOf, z } from 'zod'

export const signUpSchema = object({
  name: string({
    required_error: 'Name is required',
  }),
  email: string({
    required_error: 'Email address is required',
  }).email('Invalid email address'),
  password: string({
    required_error: 'Password is required',
  })
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
  passwordConfirm: string({
    required_error: 'Please confirm your password',
  }),
})

signUpSchema.refine((data) => data.password === data.passwordConfirm, {
  path: ['passwordConfirm'],
  message: 'Passwords do not match',
})

export const loginSchema = object({
  email: string({
    required_error: 'Email address is required'
  }).email('Invalid email address'),
  password: string({
    required_error: 'Password is required',
  }).min(8, 'Invalid email or password'),
})

export const updateSchema = object({
  id: string({
    required_error: 'Id is required',
  }),
  name: string({
    required_error: 'Name is required',
  }),
  email: string({
    required_error: 'Email address is required',
  }).email('Invalid email address'),
})

export type SignUpInput = TypeOf<typeof signUpSchema>

export type LoginInput = TypeOf<typeof loginSchema>

export type UpdateInput = TypeOf<typeof updateSchema>