'use server'
import { prisma } from '@/lib/prisma'
import { Product } from '@/type'

export async function getProducts() {
  try {
    const products = await prisma.product.findMany()
    const productsUpdated: Product[] = products.map((product) => ({
      ...product,
      price: product.price.toNumber(),
    }))
    return productsUpdated
  } catch (err) {
    console.log(err)
    return []
  }
}
