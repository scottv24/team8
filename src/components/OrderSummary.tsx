import { Basket } from '@/types'
import QuantityPicker from './QuantityPicker'

export default function OrderSummary({
  basket,
  updateBasket,
  total,
}: {
  basket: Basket
  updateBasket: (basket: Basket) => void
  total: number
}) {
  return (
    <div className='flex flex-col items-center w-full'>
      {basket.map((product) => (
        <div className='w-2/3 grid grid-cols-4  pt-8 ' key={product.productId}>
          <p className='text-left font-bold'>{product.name}</p>
          <p className='font-bold text-center'>{product.quantity}</p>
          <p className='font-bold text-center'>
            {(product.price * product.quantity).toFixed(2)}
          </p>
          <QuantityPicker
            basket={basket}
            product={product}
            updateBasket={updateBasket}
          />
        </div>
      ))}
      <p className='py-8 my-2 text-lg font-bold text-blue-900'>
        Total: £{total.toFixed(2)}
      </p>
    </div>
  )
}
