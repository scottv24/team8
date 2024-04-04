'use server'

import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

export async function login(email: string, password: string) {
  try {
    const user = await prisma.user.findUnique({ where: { email } })
    const hash = user?.password
    if (!hash) {
      return { success: false, error: 'Could not find account with this email' }
    }

    const correct = await bcrypt.compare(password, hash)
    if (!correct) return { success: false, error: 'Incorrect password' }

    const jwtSecret = process.env.JWT_SECRET
    if (!jwtSecret)
      return { success: false, error: 'Error logging in, try again later' }

    const token = jwt.sign({ userId: user.userId }, jwtSecret, {
      expiresIn: '8h',
    })

    cookies().set({ name: 'token', value: token, httpOnly: true })
    return { success: true }
  } catch (err) {
    console.log(err)
    return { success: false, error: 'Error logging in, try again later' }
  }
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

export async function signUp(
  email: string,
  password1: string,
  password2: string
) {
  let user = await prisma.user.findUnique({ where: { email } })
  if (user) {
    return { success: false, error: 'Email already in use' }
  }

  if (password1 !== password2) {
    return { success: false, error: "Passwords don't match" }
  }

  const password = await bcrypt.hash(password1, 10)
  user = await prisma.user.create({ data: { email, password } })

  const jwtSecret = process.env.JWT_SECRET
  if (!jwtSecret)
    return { success: false, error: 'Error logging in, try again later' }

  const token = jwt.sign({ userId: user.userId }, jwtSecret, {
    expiresIn: '8h',
  })

  cookies().set({ name: 'token', value: token, httpOnly: true })
  return { success: true }
}
