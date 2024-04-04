'use client'
import Page from '@/components/page'
import { useEffect, useRef, useState } from 'react'
import { Basket } from '@/types'
import { completePurchase, getBasket, updateBasketDB } from '@/db/basket'
import { loggedInCheck } from '@/db/login'
import Spinner from '@/components/Spinner'
import OrderSummary from '@/components/OrderSummary'
import CardPayment from '@/components/CardPayment'
import { updateBasketTimes } from '@/db/times'

export default function BasketPage() {
  let pageTimer = 0

  useEffect(() => {
    let pageTimerFunction
    clearInterval(pageTimerFunction)

    pageTimerFunction = setInterval(() => {
      pageTimer++
      //Update time in DB if timer reaches 10 seconds
      if (pageTimer === 5) {
        pageTimer = 0
        updateBasketTimes()
      }
    }, 1000)
  }, [])

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
  const [error, setError] = useState('')
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    month: 0,
    year: 0,
    cvc: '',
  })
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
      console.log(basket)
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
    return (
      <Page basket={basket} active='Basket'>
        <div className='w-full h-full py-20'>No products in basket.</div>
      </Page>
    )
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
                  <OrderSummary
                    basket={basket}
                    updateBasket={updateBasket}
                    total={total}
                  />
                )}
              </div>
            </>
          )}
          {page === 1 && (
            <CardPayment
              total={total}
              updateCardDetails={(value: {
                number?: string
                name?: string
                month?: number
                year?: number
                cvc?: string
              }) => setCardDetails({ ...cardDetails, ...value })}
              error={error}
            />
          )}
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold rounded w-2/3 py-2 self-center my-6'
            onClick={async () => {
              if (page === 0) {
                setPage(1)
              } else {
                const { error } = await checkCardDetails(cardDetails)
                setError(error || '')
              }
            }}
          >
            {page === 0 ? 'Continue Purchase' : 'Complete Payment'}
          </button>
        </div>
      </Page>
    </main>
  )
}

async function checkCardDetails(cardDetails: {
  number: string
  name: string
  month: number
  year: number
  cvc: string
}) {
  const { number, name, month, year, cvc } = cardDetails
  if (number.replace(/\s/g, '').length !== 16) {
    return { error: 'card' }
  }
  if (name.replace(/\s/g, '') === '') {
    return { error: 'name' }
  }
  if (month > 12 || month < 1) {
    return { error: 'month' }
  }
  if (year < 24) {
    return { error: 'year' }
  }
  if (cvc.replace(/\s/g, '').length !== 3) {
    return { error: 'cvc' }
  }
  const completed = await completePurchase()
  if (completed) {
    window.location.replace('/confirmation')
  }
  return {}
}
