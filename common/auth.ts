import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { verify } from "argon2";

import prisma from './prisma'
import { loginSchema } from './validation/auth'
import { randomBytes, randomUUID } from 'crypto'

export const nextAuthOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    // 空闲会话有效期
    maxAge: 30 * 24 * 60 * 60, 
    // 会话令牌随机UUID
    generateSessionToken: () => {
      return randomUUID?.() ?? randomBytes(32).toString("hex")
    },
  },
  jwt: {
    // Defaults to `session.maxAge`. JWT最长有效期
    maxAge: 24 * 60 * 60,
  },
  pages: {
    signIn: '/signIn',
    error: '/auth/error',
    newUser: '/auth/signup',
  },
  callbacks: {
    async signIn({user, account, profile, email}) {
      // 控制用户是否可登录
      return true
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.accessToken = token.accessToken as string
      session.user.id = token.id as string
      
      return session
    },
    async jwt({ token, user }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (user) {
        token.id = user.id
        token.email = user.email
      }

      return token
    },
    async redirect({baseUrl, url}) {
      console.log(baseUrl, url)

      return baseUrl
    }
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'jsmith@gmail.com'
        },
        password: {
          label: 'Password',
          type: 'password'
        }
      },
      async authorize(credentials, req) {
        // 查找用户，是否注册登录
        const creds = await loginSchema.parseAsync(credentials)
        
        const user = await prisma.user.findFirst({
          where: { email: creds.email },
        })

        if (!user) return null

        const isValidPassword = await verify(user.password, creds.password)
        if (!isValidPassword) return null

        return {
          id: user.id,
          email: user.email,
          name: user.name
        }
      }
    })
  ],
}
