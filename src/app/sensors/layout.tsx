import type { Metadata } from 'next'
import localFont from 'next/font/local'
import '../globals.css'

import { Toaster } from '@/components/ui/sonner'

import Header from './_components/header'
import Footer from './_components/footer'

const geistSans = localFont({
  src: '../fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: '../fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'Flood Wave',
  description: 'Flood Level and Monitoring System',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex min-h-screen flex-col bg-gray-100">
          <Header />
          {children}
          <Toaster richColors />
          <Footer />
        </div>
      </body>
    </html>
  )
}
