import { MouseEventHandler, ReactElement, ReactNode } from 'react'

export default function Card({
  children,
  className,
  onClick,
}: {
  children: ReactNode
  className?: string
  onClick?: MouseEventHandler<HTMLDivElement>
}) {
  return (
    <div
      className={className + ' w-full bg-white shadow-xl '}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
