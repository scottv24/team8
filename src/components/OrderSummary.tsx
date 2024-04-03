import { removeFromBasket } from '@/basket'
import { Basket } from '@/types'

export default function OrderSummary({
  basket,
  updateBasket,
}: {
  basket: Basket
  updateBasket: (basket: Basket) => void
}) {
  return (
    <div className='flex flex-col items-center w-full'>
      {basket.map((product) => (
        <div className='w-1/2 grid grid-cols-3  pt-8 ' key={product.productId}>
          <p className='text-left font-bold'>{product.name}</p>
          <p className='font-bol text-center'>{product.quantity}</p>
          <button
            className='bg-red-500 hover:bg-red-900 text-white font-bold py-2 rounded'
            onClick={() => updateBasket(removeFromBasket(basket, product))}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  )
}
