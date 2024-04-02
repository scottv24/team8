import { type ReactNode } from 'react'
import Navbar from './Navbar'
import { Basket } from '@/types'

export default function Page({
  children,
  basket,
}: {
  children: ReactNode
  basket: Basket
}) {
  return (
    <div
      className={`flex w-screen overflow-x-hidden h-max sm:h-screen pt-20 bg-bg`}
    >
      <Navbar active='Products' basket={basket}></Navbar>
      <div
        className='mt-1/6 flex 
      flex-col items-center justify-start p-24 overflow-x-hidden w-screen'
      >
        {children}
      </div>
    </div>
  )
}
