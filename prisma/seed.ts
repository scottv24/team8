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
  try {
    const data = [
      {
        name: 'Police Station Set',
        description: 'Police station blox set. 200pc.',
        price: 49.99,
        img: '/Police.png',
      },
      {
        name: 'Fire Engine Set',
        description: 'Fire Engine blox set. 200pc.',
        price: 39.99,
        img: '/Fire Engine.png',
      },
      {
        name: 'Battle Bus Set',
        description: 'Battle bus blox set 150pc.',
        price: 69.99,
        img: '/BattleBus.webp',
      },
      {
        name: 'Brown Car Set',
        description: 'Brown Car blox set. 200pc.',
        price: 29.99,
        img: '/BrownCar.jpg',
      },
      {
        name: 'Lego Ring Set',
        description: 'Lego Ring Set. 350pc',
        price: 49.99,
        img: '/Lego Ring.webp',
      },
      {
        name: 'Lego Box',
        description: 'Lego Box. 1000pc.',
        price: 39.99,
        img: '/Lego.jpg',
      },
      {
        name: 'Avungers Tower Set',
        description: 'Avungers Tower Set 700pc.',
        price: 89.99,
        img: '/Avungers Skyscraper.png',
      },
      {
        name: 'Wizard House Set',
        description: 'Wizard House Set. 450pc.',
        price: 89.99,
        img: '/WizardHouse.jpg',
      },
      {
        name: 'SpaceShip Set',
        description: 'SpaceShip Set. 1500pc',
        price: 49.99,
        img: '/SpaceShip.jpg',
      },
      {
        name: 'Red Lizard Set',
        description: 'Red Lizard Set. 250pc.',
        price: 19.99,
        img: '/RedLizard.jpg',
      },
      {
        name: 'Blue Dragon Set',
        description: 'Blue Dragon 250pc.',
        price: 19.99,
        img: '/Blue Dragon.jpg',
      },
      {
        name: 'Fantasy House Set',
        description: 'Fantasy House Set. 650pc.',
        price: 19.99,
        img: '/FantasyHouse.png',
      },
    ]

    await prisma.product.createMany({ data })
  } catch (err) {
    console.error(err)
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
