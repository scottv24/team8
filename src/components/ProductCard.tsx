import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Card from './Card'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'

export default function ProductCard({
  product,
}: {
  product: {
    productId: number
    name: string
    description: string
    price: number
    img: string
  }
}) {
  return (
    <Card
      className='rounded-md min-h-64 hover:cursor-pointer pt-2 lg:px-8 lg:pb-8 px-4 pb-4 flex flex-col justify-between'
      key={product.productId}
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
      <button className='rounded-lg bg-blue-900 text-white p-2 hover:bg-blue-700'>
        Add to cart <FontAwesomeIcon icon={faCartPlus} />
      </button>
    </Card>
  )
}
