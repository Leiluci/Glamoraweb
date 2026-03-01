'use client'

import { use } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import SiteLayout from '@/components/layout/SiteLayout'
import ProductCard from '@/components/ui/ProductCard'
import { products, categories, getCategoryName } from '@/lib/products'
import { useLang } from '@/components/providers/GlamoraProviders'

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const { t, lang } = useLang()

  const category = categories.find(c => c.id === slug)
  const categoryProducts = products.filter(p => p.category === slug)
  const catName = category ? getCategoryName(category, lang) : slug.replace(/-/g, ' ')

  return (
    <SiteLayout>
      {/* Category header */}
      <div className="relative overflow-hidden py-16 lg:py-24" style={{ backgroundColor: 'var(--cream)' }}>
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <nav className="flex items-center gap-2 mb-6 text-[10px] tracking-widest uppercase" style={{ color: 'var(--warm-gray)' }}>
            <Link href="/" className="transition-colors" style={{}}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--gold)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--warm-gray)'}
            >
              {lang === 'az' ? 'Ana Səhifə' : lang === 'ru' ? 'Главная' : 'Home'}
            </Link>
            <ChevronRight size={10} />
            <span style={{ color: 'var(--charcoal)' }}>{catName}</span>
          </nav>
          <h1 className="font-display font-light text-5xl lg:text-6xl text-balance" style={{ color: 'var(--charcoal)' }}>
            {catName}
          </h1>
          <p className="mt-3 text-sm font-light" style={{ color: 'var(--warm-gray)' }}>
            {categoryProducts.length} {lang === 'az' ? 'məhsul' : lang === 'ru' ? 'товаров' : 'products'}
          </p>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10 py-14 page-enter">
        {categoryProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-display text-3xl font-light mb-4" style={{ color: 'var(--charcoal)' }}>
              {lang === 'az' ? 'Məhsul tapılmadı' : lang === 'ru' ? 'Товары не найдены' : 'No products found'}
            </p>
            <p className="text-sm mb-8" style={{ color: 'var(--warm-gray)' }}>
              {lang === 'az' ? 'Bu kateqoriyada hələ məhsul yoxdur' : lang === 'ru' ? 'В этой категории пока нет товаров' : 'No products in this category yet'}
            </p>
            <Link href="/" className="btn-gold">{lang === 'az' ? 'Ana Səhifəyə Qayıt' : lang === 'ru' ? 'На главную' : 'Back to Home'}</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
            {categoryProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </SiteLayout>
  )
}
