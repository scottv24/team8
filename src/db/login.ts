'use server'

import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

export async function login(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } })
  const hash = user?.password
  if (!hash) {
    return
  }
  const correct = await bcrypt.compare(password, hash)

  const jwtSecret = process.env.JWT_SECRET
  if (!jwtSecret || !correct) return false
  const token = jwt.sign({ userId: user.userId }, jwtSecret, {
    expiresIn: '8h',
  })

  cookies().set({ name: 'token', value: token, httpOnly: true })
  return true
}

export async function loggedInCheck() {
  try {
    const hasCookie = cookies().has('token')
    if (!hasCookie) {
      return false
    }
    const { value } = cookies().get('token') as {
      name: string
      value: string
      path: string
    }
    const jwtSecret = process.env.JWT_SECRET
    if (!jwtSecret) return false
    const { userId } = jwt.verify(value, jwtSecret) as { userId: number }
    const user = await prisma.user.findUnique({ where: { userId } })
    if (user) {
      return true
    }
    return false
  } catch (err) {
    console.log(err)
  }
}
