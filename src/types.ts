export interface Product {
  productId: number
  name: string
  description: string
  price: number
  img: string
}

type ProductWithQuantity = Product & { quantity: number }

export type Basket = ProductWithQuantity[]
