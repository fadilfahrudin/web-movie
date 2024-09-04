import type { Metadata } from 'next'
import LenisComponent from '@/lib/lenis'
import { Inter } from 'next/font/google'
import '../styles/css/main.css'
import Navbar from '@/components/molecules/Navbar'
import Footer from '@/components/molecules/Footer'
import ReduxProvider from '@/components/ReduxProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FMovie',
  description: 'Web-Movie',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {


  return (
    <html lang="en">
      <body className={`${inter.className} layout`} suppressHydrationWarning={true}>
        <ReduxProvider>
          <Navbar />
          <LenisComponent>
            {children}
          </LenisComponent>
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  )
}
