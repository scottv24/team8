'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faSignOut } from '@fortawesome/free-solid-svg-icons'
import { Basket } from '@/types'
import { useEffect, useState } from 'react'
import { countBasket } from '@/basket'
import Image from 'next/image'
import { updateBasketClicks } from '@/db/times'
import { signOut } from '@/db/login'

export default function Navbar({
  active,
  basket,
}: {
  active: string
  basket: Basket
}) {
  const [basketCount, setBasketCount] = useState<number>(0)
  useEffect(() => {
    if (basket) {
      setBasketCount(countBasket(basket))
    }
  }, [basket])

  return (
    <div className='text-lg p-4 px-16 fixed top-0 left-0 w-screen h-24 bg-white shadow-md flex justify-between overflow-hidden'>
      <div className='flex w-full justify-center align-middle'>
        <div className='w-2/5 align-middle font-bold bg-blue-900  rounded-2xl text-white sm:flex hidden items-center justify-center '>
          <h2 className='align-middle text-center p-2 w-1/2'>Blox</h2>
          <div className='h-16 w-auto aspect-square overflow-hidden p-2'>
            <Image src='/Block.svg' width={100} height={100} alt='Blox icon' />
          </div>
        </div>
        <div className='w-full flex align-middle mx-4 justify-start my-auto'>
          <button
            onClick={() => window.location.replace('/')}
            className={`w-fit p-2 rounded-md ${
              active === 'Products' ? 'text-white bg-blue-900' : 'text-blue-900'
            }`}
          >
            Products
          </button>
        </div>
      </div>
      <div className='w-full flex justify-end px-6 align-middle'>
        <button
          onClick={async () => {
            updateBasketClicks()
            window.location.replace('/basket')
          }}
          className={`p-2 rounded-md ${
            active === 'Basket' ? 'text-white bg-blue-900' : 'text-blue-900'
          } text-nowrap w-fit my-auto`}
        >
          <p>
            Basket <FontAwesomeIcon icon={faCartShopping} className='px-2' />{' '}
            {basketCount > 0 ? basketCount : ''}
          </p>
        </button>
        <button
          className='ml-4 rounded-md p-2 text-white bg-blue-900  my-auto'
          onClick={async () => {
            const success = await signOut()
            if (success) window.location.replace('/login')
          }}
        >
          Log Out <FontAwesomeIcon icon={faSignOut} />
        </button>
      </div>
    </div>
  )
}
