'use client'

import Link from 'next/link'
import { Heart, ShoppingBag, Eye } from 'lucide-react'
import { useLang, useCart, useFavorites } from '@/components/providers/GlamoraProviders'
import type { Product } from '@/lib/products'
import { getProductName } from '@/lib/products'

interface ProductCardProps {
  product: Product
  className?: string
}

export default function ProductCard({ product, className = '' }: ProductCardProps) {
  const { t, lang } = useLang()
  const { addItem } = useCart()
  const { toggleFavorite, isFavorite } = useFavorites()
  const liked = isFavorite(product.id)
  const name = getProductName(product, lang)
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <article
      className={`group relative flex flex-col bg-card ${className}`}
      style={{ border: '1px solid var(--border)' }}
    >
      {/* Image wrapper */}
      <div className="relative product-zoom aspect-[3/4] overflow-hidden" style={{ backgroundColor: 'var(--secondary)' }}>
        <Link href={`/product/${product.slug}`} tabIndex={-1} aria-hidden>
          <img
            src={product.images[0]}
            alt={name}
            className="w-full h-full object-cover"
          />
        </Link>

        {/* Badge */}
        {product.badge && (
          <span
            className="absolute top-3 left-3 text-[9px] tracking-widest uppercase px-2.5 py-1 font-medium z-10"
            style={{
                backgroundColor:
                  product.badge === 'sale'
                    ? 'var(--gold)'
                    : product.badge === 'new'
                    ? 'var(--charcoal)'
                    : product.badge === 'bestseller'
                    ? 'var(--blush)'
                    : 'var(--blush)',
              
                color:
                  product.badge === 'bestseller'
                    ? 'var(--charcoal)'
                    : 'var(--ivory)',
            }}
          >
            {product.badge === 'new' ? t('newArrival') : product.badge === 'bestseller' ? t('bestseller') : `-${discount}%`}
          </span>
        )}

        {/* Out of stock overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center z-10" style={{ backgroundColor: 'rgba(248,244,239,0.75)' }}>
            <span className="text-xs tracking-widest uppercase font-medium" style={{ color: 'var(--warm-gray)' }}>{t('outOfStock')}</span>
          </div>
        )}

        {/* Quick actions — reveal on hover */}
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-20">
          {product.inStock && (
            <button
              onClick={() => addItem(product)}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs tracking-widest uppercase font-medium transition-all duration-200"
              style={{ backgroundColor: 'var(--charcoal)', color: 'var(--ivory)' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--gold)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--charcoal)'}
            >
              <ShoppingBag size={12} />
              {t('addToCart')}
            </button>
          )}
          <Link
            href={`/product/${product.slug}`}
            className="w-full flex items-center justify-center gap-2 py-2 text-xs tracking-widest uppercase font-medium transition-all duration-200"
            style={{ backgroundColor: 'rgba(248,244,239,0.95)', color: 'var(--charcoal)', border: '1px solid var(--border)' }}
          >
            <Eye size={12} />
            {lang === 'az' ? 'Bax' : lang === 'ru' ? 'Смотреть' : 'View'}
          </Link>
        </div>

        {/* Favorite button */}
        <button
          onClick={() => toggleFavorite(product)}
          aria-label={liked ? t('removeFromFavorites') : t('addToFavorites')}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200 z-10 opacity-0 group-hover:opacity-100"
          style={{
            backgroundColor: liked ? 'var(--gold)' : 'rgba(248,244,239,0.9)',
            border: '1px solid var(--border)',
            color: liked ? 'var(--ivory)' : 'var(--charcoal)',
          }}
        >
          <Heart size={13} fill={liked ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1 p-4">
        <p className="text-[10px] tracking-widest uppercase font-light" style={{ color: 'var(--warm-gray)' }}>
          {product.brand}
        </p>
        <Link
          href={`/product/${product.slug}`}
          className="text-sm font-light leading-snug transition-colors duration-200 line-clamp-2"
          style={{ color: 'var(--charcoal)' }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--gold)'}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--charcoal)'}
        >
          {name}
        </Link>

        {/* Stars */}
        <div className="flex items-center gap-1 mt-0.5">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="text-xs" style={{ color: i < Math.floor(product.rating) ? 'var(--gold)' : 'var(--border)' }}>★</span>
            ))}
          </div>
          <span className="text-[10px]" style={{ color: 'var(--warm-gray)' }}>({product.reviewCount})</span>
        </div>

        {/* Price row */}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm font-medium" style={{ color: 'var(--charcoal)' }}>
            {product.price} AZN
          </span>
          {product.originalPrice && (
            <span className="text-xs line-through" style={{ color: 'var(--warm-gray)' }}>
              {product.originalPrice} AZN
            </span>
          )}
        </div>

        {/* Stock indicator */}
        <p className="text-[10px] tracking-wider mt-0.5" style={{ color: product.inStock ? 'var(--gold)' : 'var(--warm-gray)' }}>
          {product.inStock ? `${t('inStock')} (${product.stockCount})` : t('outOfStock')}
        </p>
      </div>
    </article>
  )
}
