'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Card from './Card'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { ReactNode } from 'react'

export default function Modal({
  setOpen,
  children,
  noSubmitExit,
}: {
  setOpen: (state: boolean) => any
  children: ReactNode
  noSubmitExit: boolean
}) {
  const handleChildElementClick = (e: React.MouseEvent<HTMLElement>) => {
    if (noSubmitExit || e?.type !== 'submit') {
      e.stopPropagation()
    }
  }

  const exit = () => {
    setOpen(false)
  }
  return (
    <div
      className='w-screen h-screen fixed bg-black bg-opacity-70 flex items-center justify-center top-0 left-0'
      onClick={() => exit()}
    >
      <Card
        className='w-full sm:w-3/4 md:w-3/5 lg:w-1/2 xl:w-2/5 h-full sm:h-auto sm:aspect-video rounded-md p-10 sm:p-6 text-lg font-semibold '
        onClick={(e: React.MouseEvent<HTMLElement>) =>
          handleChildElementClick(e)
        }
      >
        <FontAwesomeIcon
          icon={faXmark}
          className='float-right hover:text-gray lg:text-lg'
          onClick={() => exit()}
        />
        {children}
      </Card>
    </div>
  )
}
