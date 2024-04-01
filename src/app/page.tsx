import Card from '@/components/Card'
import ProductCard from '@/components/ProductCard'
import Page from '@/components/page'
import Image from 'next/image'

export default function Home() {
  const products = [
    {
      productId: 1,
      name: 'Police Station Set',
      description: 'Police station blox set. 200pc.',
      price: 49.99,
      img: '/Police.png',
    },
    {
      productId: 2,
      name: 'Fire Engine Set',
      description: 'Fire Engine blox set. 200pc.',
      price: 39.99,
      img: '/Fire Engine.png',
    },
  ]
  return (
    <main
      className='
    min-h-screen  w-full'
    >
      <Page>
        <h1 className='font-bold text-2xl'>Products</h1>
        <div className='w-full grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 pt-8'>
          {products &&
            products.map((product) => <ProductCard product={product} />)}
        </div>
      </Page>
    </main>
  )
}
