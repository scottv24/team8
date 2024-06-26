import { Decimal } from '@prisma/client/runtime/library'

export interface Product {
  productId: number
  name: string
  description: string
  price: number
  img: string
}

export type ProductWithQuantity = Product & { quantity: number }

export type Basket = ProductWithQuantity[]
