import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const defaultUserPasswd = process.env.USER_PSWD || ''
  const password = await bcrypt.hash(defaultUserPasswd, 10)

  const user = await prisma.user.upsert({
    where: {
      email: 'testingaccount@test.com',
    },
    update: {},
    create: {
      email: 'testingaccount@test.com',
      password,
    },
  })
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
