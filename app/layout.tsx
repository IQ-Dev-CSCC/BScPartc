import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import { ChatBot } from '@/components/ChatBot'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Boumerdes Explorer',
  description: 'Discover, Experience, and Invest in Boumerdes, Algeria',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} pt-16`}>
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
          <ChatBot />
      </body>
    </html>
  )
}

