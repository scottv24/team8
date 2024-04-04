import { getNewBasket, removeFromBasket } from '@/basket'
import { ProductWithQuantity } from '@/type'
import { Basket } from '@/types'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function QuantityPicker({
  basket,
  product,
  updateBasket,
}: {
  basket: Basket
  product: ProductWithQuantity
  updateBasket: (basket: Basket) => void
}) {
  const updateBasketClick = (e: React.MouseEvent<HTMLElement>) => {
    if (e && e.stopPropagation) e.stopPropagation()
  }

  const removeBasket = (e: React.MouseEvent<HTMLElement>) => {
    if (e && e.stopPropagation) e.stopPropagation()
    updateBasket(removeFromBasket(basket, product))
  }

  return (
    <div className='flex w-full justify-center'>
      <div className='flex w-1/2'>
        <button
          className='px-2  font-bold text-2xl aspect-square border-2 bg-blue-600 hover:bg-blue-900 text-white border-slate-800 rounded-full'
          onClick={(e) => {
            updateBasketClick(e)
            updateBasket(getNewBasket(basket, product, product.quantity - 1))
          }}
        >
          -
        </button>
        <input
          className='border-2 border-black w-1/4 p-2 rounded-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
          type='number'
          min={0}
          max={25}
          value={product.quantity}
          onChange={(e) =>
            updateBasket(getNewBasket(basket, product, +e.target.value))
          }
          onClick={(e) => updateBasketClick(e)}
        />
        <button
          className='px-2 bg-blue-600 text-white hover:bg-blue-900 font-bold text-2xl aspect-square border-2 border-slate-800 rounded-full'
          onClick={(e) => {
            updateBasketClick(e)
            updateBasket(getNewBasket(basket, product, product.quantity + 1))
          }}
        >
          +
        </button>
      </div>
      <button
        className='w-1/4 bg-red-700 hover:bg-red-800 text-white rounded-lg'
        onClick={(e) => removeBasket(e)}
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  )
}
