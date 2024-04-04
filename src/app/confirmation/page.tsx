'use client'
import Page from '@/components/page'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Confirmation() {
  return (
    <Page active='Basket' basket={[]}>
      <div className='flex flex-col p-24 justify-center align-middle items-center'>
        <FontAwesomeIcon
          icon={faCheckCircle}
          className='text-green-700 text-6xl'
        />
        <p className='text-green-700 font-bold text-4xl text-center my-2'>
          Order Confirmed!
        </p>
        <button
          className='bg-blue-900 font-bold text-white p-2 rounded-md my-16'
          onClick={() => window.location.replace('/')}
        >
          Return to Products
        </button>
      </div>
    </Page>
  )
}
