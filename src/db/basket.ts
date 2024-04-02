'use server'

import { prisma } from '@/lib/prisma'
import { Basket } from '@/types'

export async function updateBasketDB(basket: Basket) {
  console.log(basket)
  //prisma.product.createMany({data: []})
}
