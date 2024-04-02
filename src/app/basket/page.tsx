import Card from '@/components/Card'
import ProductCard from '@/components/ProductCard'
import Page from '@/components/page'
import Image from 'next/image'
import Navbar from '../Navbar'
export default function Basket() {
  const products = [
    {
      productId: 1,
      name: 'Police Station Set',
      description: 'Police station blox set. 200pc.',
      price: 49.99,
      img: '/Police.png',
      quantity: 1,
    },
    {
      productId: 2,
      name: 'Fire Engine Set',
      description: 'Fire Engine blox set. 200pc.',
      price: 39.99,
      img: '/Fire Engine.png',
      quantity: 2,
    },
    {
      productId: 1,
      name: 'Police Station Set',
      description: 'Police station blox set. 200pc.',
      price: 49.99,
      img: '/Police.png',
      quantity: 1,
    },
    {
      productId: 2,
      name: 'Fire Engine Set',
      description: 'Fire Engine blox set. 200pc.',
      price: 39.99,
      img: '/Fire Engine.png',
      quantity: 2,
    },
    {
      productId: 1,
      name: 'Police Station Set',
      description: 'Police station blox set. 200pc.',
      price: 49.99,
      img: '/Police.png',
      quantity: 1,
    },
    {
      productId: 2,
      name: 'Fire Engine Set',
      description: 'Fire Engine blox set. 200pc.',
      price: 39.99,
      img: '/Fire Engine.png',
      quantity: 2,
    },
  ]
  return (
    <main
      className='
    min-h-screen  w-full'
    >
      <Page basket={[]}>
        <div className='grid grid-rows-2 w-full'>
          <h1 className='font-bold text-2xl'>Products</h1>
          <div className=''>
            {products &&
              products.map((product) => (
                <div
                  className='w-full grid lg:grid-cols-3  pt-8 '
                  key={product.productId}
                >
                  <p className='text-left font-bold'>{product.name}</p>
                  <p className='font-bol text-center'>{product.quantity}</p>
                  <button className='bg-red-500 hover:bg-red-900 text-white font-bold py-2 rounded'>
                    Remove
                  </button>
                </div>
              ))}
          </div>
          <div className='py-2'></div>
        </div>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold rounded w-full py-2'>
          Complete Purchase
        </button>
      </Page>
    </main>
  )
}
