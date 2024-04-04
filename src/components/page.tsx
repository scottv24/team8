import { type ReactNode } from 'react'
import Navbar from './Navbar'
import { Basket } from '@/types'

export default function Page({
  children,
  basket,
  active,
}: {
  children: ReactNode
  basket: Basket
  active: 'Products' | 'Basket'
}) {
  return (
    <div
      className={`flex w-screen overflow-x-hidden h-max sm:h-screen pt-20 bg-bg`}
    >
      <Navbar active={active} basket={basket} />
      <div
        className='mt-1/6 flex 
      flex-col items-center justify-start sm:p-24 py-24 px-12 overflow-x-hidden w-screen'
      >
        {children}
      </div>
    </div>
  )
}
