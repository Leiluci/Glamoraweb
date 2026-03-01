'use client'

import Link from 'next/link'
import { useLang } from '@/components/providers/GlamoraProviders'
import { categories, getCategoryName } from '@/lib/products'

export default function CategoriesSection() {
  const { t, lang } = useLang()

  return (
    <section className="py-20 lg:py-28" style={{ backgroundColor: 'var(--background)' }}>
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10">

        {/* Section header */}
        <div className="text-center mb-14">
          <p className="text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color: 'var(--gold)' }}>
            {lang === 'az' ? 'Kateqoriyalar' : lang === 'ru' ? 'Категории' : 'Categories'}
          </p>
          <h2 className="font-display font-light text-4xl lg:text-5xl" style={{ color: 'var(--charcoal)' }}>
            {t('featuredCategories')}
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <Link
              key={cat.id}
              href={`/category/${cat.id}`}
              className="group relative overflow-hidden block"
              style={{ aspectRatio: i === 0 || i === 4 ? '2/2.5' : '1/1.25' }}
            >
              {/* Image */}
              <div className="absolute inset-0 product-zoom">
                <img
                  src={cat.image}
                  alt={getCategoryName(cat, lang)}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 transition-all duration-500"
                style={{ background: 'linear-gradient(to top, rgba(61,53,48,0.75) 0%, rgba(61,53,48,0.1) 60%)' }} />

              {/* Text */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-[9px] tracking-[0.2em] uppercase mb-1 transition-all duration-300"
                  style={{ color: 'var(--gold)' }}>
                  {lang === 'az' ? 'Kateqoriya' : lang === 'ru' ? 'Категория' : 'Category'}
                </p>
                <h3 className="font-display text-base font-light text-balance leading-tight" style={{ color: 'var(--ivory)' }}>
                  {getCategoryName(cat, lang)}
                </h3>
                <div className="w-0 h-px mt-2 transition-all duration-500 group-hover:w-8"
                  style={{ backgroundColor: 'var(--gold)' }} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
