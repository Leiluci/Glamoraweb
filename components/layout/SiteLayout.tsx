'use client'
import Header from './Header'
import Footer from './Footer'
import CartDrawer from '@/components/ui/CartDrawer'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <CartDrawer />
    </div>
  )
}
