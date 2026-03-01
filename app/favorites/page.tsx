'use client'

import Link from 'next/link'
import { Heart } from 'lucide-react'
import SiteLayout from '@/components/layout/SiteLayout'
import ProductCard from '@/components/ui/ProductCard'
import { useLang, useFavorites } from '@/components/providers/GlamoraProviders'

export default function FavoritesPage() {
  const { t, lang } = useLang()
  const { favorites } = useFavorites()

  return (
    <SiteLayout>
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10 py-10 lg:py-16 page-enter">
        <div className="flex items-baseline gap-4 mb-10">
          <h1 className="font-display font-light text-4xl lg:text-5xl" style={{ color: 'var(--charcoal)' }}>
            {t('yourFavorites')}
          </h1>
          {favorites.length > 0 && (
            <span className="text-sm" style={{ color: 'var(--warm-gray)' }}>({favorites.length})</span>
          )}
        </div>

        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-6 text-center">
            <Heart size={48} strokeWidth={1} style={{ color: 'var(--border)' }} />
            <div>
              <p className="font-display text-2xl font-light mb-2" style={{ color: 'var(--charcoal)' }}>
                {t('emptyFavorites')}
              </p>
              <p className="text-sm" style={{ color: 'var(--warm-gray)' }}>
                {lang === 'az' ? 'Bəyəndiyiniz məhsulları ürəkciyə basaraq saxlayın' : lang === 'ru' ? 'Сохраняйте понравившиеся товары нажатием на сердечко' : 'Save your favourite products by clicking the heart icon'}
              </p>
            </div>
            <Link href="/" className="btn-gold">{t('exploreProducts')}</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
            {favorites.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </SiteLayout>
  )
}
