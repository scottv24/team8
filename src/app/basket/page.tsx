'use client'
import Page from '@/components/page'
import { useEffect, useRef, useState } from 'react'
import { Basket } from '@/types'
import { getBasket, updateBasketDB } from '@/db/basket'
import { loggedInCheck } from '@/db/login'
import Spinner from '@/components/Spinner'

export default function BasketPage() {
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
  const pageRendered = useRef(false)

  useEffect(() => {
    const checkLogin = async () => {
      const loggedIn = await loggedInCheck()
      if (!loggedIn) {
        window.location.replace('/login')
      }
      const basket = await getBasket()
      if (basket) {
        updateBasket(basket)
      }
    }
    checkLogin()
  }, [])

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
    min-h-screen  w-full'
    >
      <Page basket={basket} active='Basket'>
        <div className='h-full w-full flex flex-col'>
          <h1 className='font-bold text-2xl'>Products</h1>
          <div className=''>
            {basket.length === 1 && basket[0].productId === -1 && <Spinner />}
            {basket.length > 0 &&
              basket[0].productId !== -1 &&
              basket.map((product) => (
                <div
                  className='w-full grid grid-cols-3  pt-8 '
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
