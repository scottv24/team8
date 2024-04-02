import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

export function getUserId() {
  const hasCookie = cookies().has('token')
  if (!hasCookie) {
    return null
  }
  const { value } = cookies().get('token') as {
    name: string
    value: string
    path: string
  }
  const jwtSecret = process.env.JWT_SECRET
  if (!jwtSecret) return null
  const { userId } = jwt.verify(value, jwtSecret) as { userId: number }
  return userId
}
