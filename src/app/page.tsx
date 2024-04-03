'use client'
import { getBasketCount, getNewBasket, removeFromBasket } from '@/basket'
import Card from '@/components/Card'
import Modal from '@/components/Modal'
import ProductCard from '@/components/ProductCard'
import Spinner from '@/components/Spinner'
import Page from '@/components/page'
import { getBasket, updateBasketDB } from '@/db/basket'
import { loggedInCheck, login } from '@/db/login'
import { getProducts } from '@/db/products'
import { Basket, Product } from '@/types'
import { faCartPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

export default function Home() {
  const [product, showProduct] = useState<Product | null>(null)
  const [basket, updateBasket] = useState<Basket>([
    {
      productId: -1,
      description: '',
      img: '',
      price: 0,
      name: '',
      quantity: 0,
    },
  ])
  const [basketCount, setBasketCount] = useState<number>(0)
  const [products, setProducts] = useState<Product[]>([])
  const pageRendered = useRef(false)

  const addToBasket = (product: Product) =>
    updateBasket([...basket, { ...product, quantity: 1 }])

  useEffect(() => {
    const checkLogin = async () => {
      const loggedIn = await loggedInCheck()
      if (!loggedIn) {
        window.location.replace('/login')
      }
      const products = await getProducts()
      setProducts(products)
      const basket = await getBasket()
      if (basket) {
        updateBasket(basket)
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
    if (pageRendered.current) {
      updateBasketDB(basket)
      return
    }
    pageRendered.current = true
  }, [basket])

  return (
    <main
      className='
    min-h-screen  w-full overflow-y-auto overflow-x-hidden'
    >
      <Page basket={basket}>
        <h1 className='font-bold text-2xl'>Products</h1>
        {products.length === 0 && <Spinner />}
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
