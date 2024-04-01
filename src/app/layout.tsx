import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import '@fortawesome/fontawesome-svg-core/styles.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Team 8 Ecommerce',
  description: 'Team 8 Ecommerce',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`bg-[#F2F1F1] ${inter.className}`}>{children}</body>
    </html>
  )
}
