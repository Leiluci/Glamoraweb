import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { GlamoraProviders } from '@/components/providers/GlamoraProviders'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'GLAMORA — Premium Beauty & Salon Supplies',
  description: 'Discover luxury beauty and professional salon supplies at GLAMORA. Premium hair care, nail care, cosmetology devices, makeup and more.',
  keywords: 'luxury beauty, salon supplies, professional cosmetics, hair care, nail care',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="az" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garant:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        <GlamoraProviders>
          {children}
        </GlamoraProviders>
      </body>
    </html>
  )
}
