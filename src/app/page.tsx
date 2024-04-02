'use client'
import { getBasketCount, getNewBasket, removeFromBasket } from '@/basket'
import Card from '@/components/Card'
import Modal from '@/components/Modal'
import ProductCard from '@/components/ProductCard'
import Page from '@/components/page'
import { updateBasketDB } from '@/db/basket'
import { loggedInCheck, login } from '@/db/login'
import { Basket, Product } from '@/types'
import { faCartPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function Home() {
  const [product, showProduct] = useState<Product | null>(null)
  const [basket, updateBasket] = useState<Basket>([])
  const [basketCount, setBasketCount] = useState<number>(0)

  const addToBasket = (product: Product) =>
    updateBasket([...basket, { ...product, quantity: 1 }])

  useEffect(() => {
    const checkLogin = async () => {
      const loggedIn = await loggedInCheck()
      if (!loggedIn) {
        window.location.replace('/login')
      }
    }
    checkLogin()
  }, [])

  useEffect(() => {
    if (product) {
      const inBasket = getBasketCount(basket, product)
      setBasketCount(inBasket)
    }
  }, [product, basket])

  useEffect(() => {
    updateBasketDB(basket)
  }, [basket])

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
    {
      productId: 3,
      name: 'Battle Bus Set',
      description: 'Battle bus blox set 150pc.',
      price: 69.99,
      img: '/BattleBus.webp',
    },
    {
      productId: 4,
      name: 'Brown Car Set',
      description: 'Brown Car blox set. 200pc.',
      price: 29.99,
      img: '/BrownCar.jpg',
    },
    {
      productId: 5,
      name: 'Lego Ring Set',
      description: 'Lego Ring Set. 350pc',
      price: 49.99,
      img: '/Lego Ring.webp',
    },
    {
      productId: 6,
      name: 'Lego Box',
      description: 'Lego Box. 1000pc.',
      price: 39.99,
      img: '/Lego.jpg',
    },
    {
      productId: 7,
      name: 'Avungers Tower Set',
      description: 'Avungers Tower Set 700pc.',
      price: 89.99,
      img: '/Avungers Skyscraper.png',
    },
    {
      productId: 8,
      name: 'Wizard House Set',
      description: 'Wizard House Set. 450pc.',
      price: 89.99,
      img: '/WizardHouse.jpg',
    },
    {
      productId: 9,
      name: 'SpaceShip Set',
      description: 'SpaceShip Set. 1500pc',
      price: 49.99,
      img: '/SpaceShip.jpg',
    },
    {
      productId: 10,
      name: 'Red Lizard Set',
      description: 'Red Lizard Set. 250pc.',
      price: 19.99,
      img: '/RedLizard.jpg',
    },
    {
      productId: 11,
      name: 'Blue Dragon Set',
      description: 'Blue Dragon 250pc.',
      price: 19.99,
      img: '/Blue Dragon.jpg',
    },
    {
      productId: 12,
      name: 'Fantasy House Set',
      description: 'Fantasy House Set. 650pc.',
      price: 19.99,
      img: '/FantasyHouse.png',
    },
  ]
  return (
    <main
      className='
    min-h-screen  w-full overflow-y-auto overflow-x-hidden'
    >
      <Page basket={basket}>
        <h1 className='font-bold text-2xl'>Products</h1>
        <div className='w-full grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 pt-8'>
          {products &&
            products.map((product) => (
              <ProductCard
                product={product}
                key={`productCard${product.productId}`}
                showProduct={() => showProduct(product)}
                addToBasket={() => {
                  addToBasket(product)
                  console.log(basket)
                }}
                basket={basket}
                updateBasket={updateBasket}
              />
            ))}
        </div>
      </Page>
      {product && (
        <Modal
          noSubmitExit={false}
          setOpen={(show: boolean) => {
            if (!show) {
              showProduct(null)
            }
          }}
        >
          <p className='font-bold text-xl text-blue-900'>
            {product.name} - £{product.price}
          </p>
          <div className='w-full flex justify-center'>
            <Image
              src={product.img}
              alt='Image of police station set.'
              width={200}
              height={100}
            />
          </div>
          <p className='text-slate-500 text-base font-light py-8'>
            {product.description}{' '}
          </p>
          <div className='w-full flex justify-center'>
            {basketCount === 0 ? (
              <button
                className='rounded-lg bg-blue-900 text-white p-2 hover:bg-blue-700'
                onClick={() => addToBasket(product)}
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
                />
                <button
                  className='w-1/4 bg-red-700 text-white rounded-lg'
                  onClick={() =>
                    updateBasket(removeFromBasket(basket, product))
                  }
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            )}
          </div>
        </Modal>
      )}
    </main>
  )
}
