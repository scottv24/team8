'use client'
import Page from '@/components/page'
import { useEffect, useRef, useState } from 'react'
import { Basket } from '@/types'
import { getBasket, updateBasketDB } from '@/db/basket'
import { loggedInCheck } from '@/db/login'
import Spinner from '@/components/Spinner'
import OrderSummary from '@/components/OrderSummary'
import CardPayment from '@/components/CardPayment'

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
  const [page, setPage] = useState(0)

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

  const total = basket.reduce(
    (n, { price, quantity }) => n + price * quantity,
    0
  )

  if (basket.length <= 0) {
    return <div className='w-full h-full py-20'>No products in basket.</div>
  }
  return (
    <main
      className='
    min-h-screen  w-full overflow-y-auto overflow-x-hidden'
    >
      <Page basket={basket} active='Basket'>
        {page === 1 && (
          <button
            className='text-blue-900 underline self-start pb-2 mt-[-20px]'
            onClick={() => setPage(page - 1)}
          >
            ← Back
          </button>
        )}
        <div className='h-full w-full flex flex-col justify-between'>
          {page === 0 && (
            <>
              <h1 className='font-bold text-2xl'>Products</h1>
              <div className=''>
                {basket.length === 1 && basket[0].productId === -1 && (
                  <Spinner />
                )}
                {basket[0].productId !== -1 && (
                  <OrderSummary basket={basket} updateBasket={updateBasket} />
                )}
              </div>
            </>
          )}
          {page === 1 && <CardPayment total={total} />}
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold rounded w-1/2 py-2 self-center my-6'
            onClick={() => setPage(1)}
          >
            {page === 0 ? 'Continue Purchase' : 'Complete Payment'}
          </button>
        </div>
      </Page>
    </main>
  )
}
