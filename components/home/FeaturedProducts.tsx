'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLang } from '@/components/providers/GlamoraProviders'
import { products } from '@/lib/products'
import ProductCard from '@/components/ui/ProductCard'
import { ArrowRight } from 'lucide-react'

type Tab = 'featured' | 'new' | 'bestseller'

export default function FeaturedProducts() {
  const { t, lang } = useLang()
  const [tab, setTab] = useState<Tab>('featured')

  const filtered = products.filter(p => {
    if (tab === 'new') return p.badge === 'new'
    if (tab === 'bestseller') return p.badge === 'bestseller'
    return true
  }).slice(0, 8)

  const tabs: { key: Tab; label: string }[] = [
    { key: 'featured', label: lang === 'az' ? 'Hamısı' : lang === 'ru' ? 'Все' : 'All' },
    { key: 'new', label: t('newArrival') },
    { key: 'bestseller', label: t('bestseller') },
  ]

  return (
    <section className="py-20 lg:py-28" style={{ backgroundColor: 'var(--cream)' }}>
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color: 'var(--gold)' }}>
              {lang === 'az' ? 'Kolleksiyamız' : lang === 'ru' ? 'Наша коллекция' : 'Our Collection'}
            </p>
            <h2 className="font-display font-light text-4xl lg:text-5xl" style={{ color: 'var(--charcoal)' }}>
              {t('featuredProducts')}
            </h2>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-0 border" style={{ borderColor: 'var(--border)' }}>
            {tabs.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className="px-5 py-2.5 text-xs tracking-widest uppercase transition-all duration-200"
                style={{
                  backgroundColor: tab === key ? 'var(--charcoal)' : 'transparent',
                  color: tab === key ? 'var(--ivory)' : 'var(--warm-gray)',
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View all */}
        <div className="flex justify-center mt-12">
          <Link href="/category/hair-care" className="btn-ghost flex items-center gap-2">
            {t('viewAll')}
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </section>
  )
}
