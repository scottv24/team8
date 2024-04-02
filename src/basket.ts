import { Basket, Product } from './types'

export function countBasket(basket: Basket) {
  let count = 0
  basket.map((product) => (count += product.quantity))
  return count
}

export function getBasketCount(basket: Basket, product: Product) {
  const occurences = basket.filter(
    (currentProduct) => currentProduct.productId === product.productId
  )
  if (occurences.length > 0) {
    return occurences[0].quantity
  } else {
    return 0
  }
}

export function getNewBasket(
  basket: Basket,
  product: Product,
  quantity: number
): Basket {
  if (quantity === 0) {
    return basket.filter(
      (currentProduct) => currentProduct.productId !== product.productId
    )
  }

  const newBasket = basket.map((currentProduct) => {
    if (product.productId === currentProduct.productId) {
      return { ...currentProduct, quantity: quantity }
    } else {
      return currentProduct
    }
  })

  return newBasket.filter((product) => product)
}

export function removeFromBasket(basket: Basket, product: Product) {
  return basket.filter(
    (currentProduct) => currentProduct.productId !== product.productId
  )
}
