'use server'

import { getUserId } from '@/cookies'
import { prisma } from '@/lib/prisma'
import { Basket } from '@/types'

export async function updateBasketDB(basket: Basket) {
  const userId = getUserId()
  if (!userId) return

  const productIds = basket.map((product) => product.productId)
  let existingBaskets = await prisma.basket.findMany({
    where: { userId, completed: false },
  })

  if (existingBaskets.length === 0) {
    await prisma.basket.create({ data: { userId } })
    existingBaskets = await prisma.basket.findMany({
      where: { userId, completed: false },
    })
  } else {
    prisma.productQuantity.deleteMany({
      where: {
        basketId: existingBaskets[0].basketId,
        NOT: { productId: { in: [...productIds] } },
      },
    })
  }

  await Promise.all(
    basket.map(async (product) => {
      await prisma.productQuantity.upsert({
        where: {
          productId_basketId: {
            basketId: existingBaskets[0].basketId,
            productId: product.productId,
          },
        },
        update: { quantity: product.quantity },
        create: {
          basketId: existingBaskets[0].basketId,
          productId: product.productId,
          quantity: product.quantity,
        },
      })
    })
  )
}

export async function getBasket() {
  const userId = getUserId()
  if (!userId) return

  let existingBaskets = await prisma.basket.findMany({
    where: { userId, completed: false },
  })

  if (existingBaskets.length === 0) {
    await prisma.basket.create({ data: { userId } })
    existingBaskets = await prisma.basket.findMany({
      where: { userId, completed: false },
    })
  }

  const { basketId } = existingBaskets[0]
  const basketRaw = await prisma.productQuantity.findMany({
    where: { basketId },
    include: { product: true },
  })
  const basket: Basket = basketRaw.map((product) => ({
    ...product.product,
    price: product.product.price.toNumber(),
    quantity: product.quantity,
  }))
  return basket
}
