import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Card from './Card'
import { faCartPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import { Basket } from '@/types'
import { ChangeEvent, useEffect, useState } from 'react'
import { getBasketCount, getNewBasket, removeFromBasket } from '@/basket'

export default function ProductCard({
  product,
  showProduct,
  addToBasket,
  updateBasket,
  basket,
}: {
  product: {
    productId: number
    name: string
    description: string
    price: number
    img: string
  }
  showProduct: () => void
  addToBasket: () => void
  updateBasket: (basket: Basket) => void
  basket: Basket
}) {
  const handleChildElementClick = (e: React.MouseEvent<HTMLElement>) => {
    if (e && e.stopPropagation) e.stopPropagation()
    addToBasket()
  }

  const updateBasketClick = (e: React.MouseEvent<HTMLElement>) => {
    if (e && e.stopPropagation) e.stopPropagation()
  }

  const removeBasket = (e: React.MouseEvent<HTMLElement>) => {
    if (e && e.stopPropagation) e.stopPropagation()
    updateBasket(removeFromBasket(basket, product))
  }

  const [basketCount, setBasketCount] = useState<number>(0)
  useEffect(() => {
    const inBasket = getBasketCount(basket, product)
    setBasketCount(inBasket)
  }, [basket])

  return (
    <Card
      className='rounded-md min-h-64 hover:cursor-pointer pt-2 lg:px-8 lg:pb-8 px-4 pb-4 flex flex-col justify-between'
      key={product.productId}
      onClick={(e) => showProduct()}
    >
      <div className='w-full flex justify-center'>
        <Image
          src={product.img}
          alt='Image of police station set.'
          width={200}
          height={100}
        />
      </div>
      <p className='font-bold'>{product.name}</p>
      <p className='font-bold text-blue-900'>£{product.price}</p>
      {basketCount === 0 ? (
        <button
          className='rounded-lg bg-blue-900 text-white p-2 hover:bg-blue-700'
          onClick={(e: React.MouseEvent<HTMLElement>) =>
            handleChildElementClick(e)
          }
        >
          Add to cart <FontAwesomeIcon icon={faCartPlus} />
        </button>
      ) : (
        <div className='flex w-full justify-center'>
          <input
            className='border-2 border-black w-1/4 p-2 rounded-md'
            type='number'
            min={0}
            max={25}
            value={basketCount}
            onChange={(e) =>
              updateBasket(getNewBasket(basket, product, +e.target.value))
            }
            onClick={(e) => updateBasketClick(e)}
          />
          <button
            className='w-1/4 bg-red-700 text-white rounded-lg'
            onClick={(e) => removeBasket(e)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      )}
    </Card>
  )
}
