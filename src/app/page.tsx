'use client'
import { getBasketCount } from '@/basket'
import Modal from '@/components/Modal'
import ProductCard from '@/components/ProductCard'
import QuantityPicker from '@/components/QuantityPicker'
import Spinner from '@/components/Spinner'
import Page from '@/components/page'
import { getBasket, updateBasketDB } from '@/db/basket'
import { loggedInCheck } from '@/db/login'
import { getProducts } from '@/db/products'
import { Basket, Product } from '@/types'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { clearInterval } from 'timers'
import {
  updateOverallATB,
  updateProductATB,
  updateProductsPageTime,
  updateTimes,
} from '@/db/times'

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
  const [resetProductTimer, flagReset] = useState(false)

  let pageTimer = 0
  let productTimer = 0
  const pageRendered = useRef(false)

  const addToBasket = (product: Product) =>
    updateBasket([...basket, { ...product, quantity: 1 }])

  const callUpdate = async () => {
    console.log('hihihihihi')
    await updateTimes({ productTimer })
    console.log('nice man')
  }

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
    let pageTimerFunction
    clearInterval(pageTimerFunction)

    pageTimerFunction = setInterval(() => {
      // Update timer for main page
      pageTimer++

      //Check if modal has been closed
      let resetFlag = false
      flagReset((state) => {
        resetFlag = state
        return false
      })
      // Send to DB and reset timer if modal is closed
      if (resetFlag) {
        updateTimes({ productTimer })
        productTimer = 0
      }

      // Update product time if modal is open
      let currentProduct = null
      showProduct((product) => {
        currentProduct = product
        return product
      })
      if (currentProduct) {
        productTimer++
      }
      //Update time in DB if timer reaches 10 seconds
      if (pageTimer === 5) {
        pageTimer = 0
        updateProductsPageTime()
      }
      console.log(`Products page: ${pageTimer}\nItem View:${productTimer}`)
    }, 1000)

    //window.addEventListener('beforeunload', beforeUnload)
    //return clearInterval(pageTimerFunction)
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
      <Page basket={basket} active='Products'>
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
                atbClicked={updateOverallATB}
              />
            ))}
        </div>
      </Page>
      {product && (
        <Modal
          noSubmitExit={false}
          setOpen={(show: boolean) => {
            if (!show) {
              flagReset(true)
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
                onClick={() => {
                  addToBasket(product)
                  updateProductATB()
                }}
              >
                Add to cart <FontAwesomeIcon icon={faCartPlus} />
              </button>
            ) : (
              <QuantityPicker
                basket={basket}
                product={{ ...product, quantity: basketCount }}
                updateBasket={updateBasket}
              />
            )}
          </div>
        </Modal>
      )}
    </main>
  )
}
