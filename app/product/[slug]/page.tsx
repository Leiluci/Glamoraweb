'use client'

import { useState } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Heart, ShoppingBag, Minus, Plus, ChevronRight, Package } from 'lucide-react'
import SiteLayout from '@/components/layout/SiteLayout'
import ProductCard from '@/components/ui/ProductCard'
import { products, getProductName, getProductDescription } from '@/lib/products'
import { useLang, useCart, useFavorites } from '@/components/providers/GlamoraProviders'
import { use } from 'react'

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const product = products.find(p => p.slug === slug)
  if (!product) notFound()

  const { t, lang } = useLang()
  const { addItem, setIsOpen } = useCart()
  const { toggleFavorite, isFavorite } = useFavorites()

  const [selectedImage, setSelectedImage] = useState(0)
  const [qty, setQty] = useState(1)
  const [addedFeedback, setAddedFeedback] = useState(false)

  const liked = isFavorite(product.id)
  const name = getProductName(product, lang)
  const description = getProductDescription(product, lang)
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)

  const handleAddToCart = () => {
    addItem(product, qty)
    setAddedFeedback(true)
    setTimeout(() => { setAddedFeedback(false); setIsOpen(true) }, 600)
  }

  return (
    <SiteLayout>
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10 py-10 lg:py-16 page-enter">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-10 text-[10px] tracking-widest uppercase" style={{ color: 'var(--warm-gray)' }}>
          <Link href="/" className="hover:text-gold transition-colors" style={{}}>
            {lang === 'az' ? 'Ana Səhifə' : lang === 'ru' ? 'Главная' : 'Home'}
          </Link>
          <ChevronRight size={10} />
          <Link href={`/category/${product.category}`} className="hover:text-gold transition-colors"
            style={{}}>
            {product.category.replace(/-/g, ' ')}
          </Link>
          <ChevronRight size={10} />
          <span style={{ color: 'var(--charcoal)' }}>{name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">

          {/* Image gallery */}
          <div className="flex gap-4">
            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex flex-col gap-3 w-16 flex-shrink-0">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className="w-16 h-20 overflow-hidden transition-all duration-200"
                    style={{
                      border: selectedImage === i ? '1px solid var(--gold)' : '1px solid var(--border)',
                      opacity: selectedImage === i ? 1 : 0.6,
                    }}
                  >
                    <img src={img} alt={`${name} ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Main image */}
            <div className="flex-1 relative overflow-hidden" style={{ backgroundColor: 'var(--secondary)', aspectRatio: '3/4' }}>
              <img
                src={product.images[selectedImage]}
                alt={name}
                className="w-full h-full object-cover transition-all duration-500"
              />
              {product.badge && (
                <span
                  className="absolute top-4 left-4 text-[9px] tracking-widest uppercase px-3 py-1.5 font-medium"
                  style={{
                    backgroundColor: product.badge === 'sale' ? 'var(--gold)' : product.badge === 'new' ? 'var(--charcoal)' : 'var(--blush)',
                    color: product.badge === 'bestseller' ? 'var(--charcoal)' : 'var(--ivory)',
                  }}
                >
                  {t(product.badge as any)}
                </span>
              )}
            </div>
          </div>

          {/* Product info */}
          <div className="flex flex-col">
            <p className="text-[10px] tracking-[0.25em] uppercase mb-2" style={{ color: 'var(--gold)' }}>{product.brand}</p>
            <h1 className="font-display text-3xl lg:text-4xl font-light mb-4 text-balance" style={{ color: 'var(--charcoal)' }}>
              {name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-5">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} style={{ color: i < Math.floor(product.rating) ? 'var(--gold)' : 'var(--border)', fontSize: 13 }}>★</span>
                ))}
              </div>
              <span className="text-xs" style={{ color: 'var(--warm-gray)' }}>({product.reviewCount} {lang === 'az' ? 'rəy' : lang === 'ru' ? 'отзывов' : 'reviews'})</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6 pb-6" style={{ borderBottom: '1px solid var(--border)' }}>
              <span className="font-display text-3xl font-light" style={{ color: 'var(--charcoal)' }}>
                {product.price} AZN
              </span>
              {product.originalPrice && (
                <span className="text-base line-through" style={{ color: 'var(--warm-gray)' }}>{product.originalPrice} AZN</span>
              )}
            </div>

            {/* Description */}
            <p className="text-sm font-light leading-relaxed mb-8" style={{ color: 'var(--warm-gray)' }}>
              {description}
            </p>

            {/* Stock */}
            <div className="flex items-center gap-2 mb-6">
              <Package size={13} style={{ color: product.inStock ? 'var(--gold)' : 'var(--warm-gray)' }} />
              <span className="text-xs tracking-wide" style={{ color: product.inStock ? 'var(--charcoal)' : 'var(--warm-gray)' }}>
                {product.inStock ? `${t('inStock')} — ${product.stockCount} ${lang === 'az' ? 'ədəd' : lang === 'ru' ? 'шт.' : 'pcs'}` : t('outOfStock')}
              </span>
            </div>

            {/* Quantity + Add */}
            {product.inStock && (
              <div className="flex flex-wrap items-center gap-4 mb-6">
                {/* Qty selector */}
                <div className="flex items-center" style={{ border: '1px solid var(--border)' }}>
                  <button onClick={() => setQty(q => Math.max(1, q - 1))} className="qty-btn" aria-label="Decrease">
                    <Minus size={12} />
                  </button>
                  <span className="w-10 text-center text-sm" style={{ color: 'var(--charcoal)' }}>{qty}</span>
                  <button
                    onClick={() => setQty(q => Math.min(product.stockCount, q + 1))}
                    disabled={qty >= product.stockCount}
                    className="qty-btn"
                    aria-label="Increase"
                  >
                    <Plus size={12} />
                  </button>
                </div>

                {/* Add to cart */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 min-w-[180px] flex items-center justify-center gap-2 py-3 text-xs tracking-widest uppercase font-medium transition-all duration-300"
                  style={{
                    backgroundColor: addedFeedback ? 'var(--gold)' : 'var(--charcoal)',
                    color: 'var(--ivory)',
                    border: '1px solid transparent',
                  }}
                >
                  <ShoppingBag size={13} />
                  {addedFeedback
                    ? (lang === 'az' ? 'Əlavə Edildi!' : lang === 'ru' ? 'Добавлено!' : 'Added!')
                    : t('addToCart')}
                </button>

                {/* Favorite */}
                <button
                  onClick={() => toggleFavorite(product)}
                  aria-label={liked ? t('removeFromFavorites') : t('addToFavorites')}
                  className="w-12 h-12 flex items-center justify-center transition-all duration-200"
                  style={{
                    border: '1px solid var(--border)',
                    backgroundColor: liked ? 'var(--gold)' : 'transparent',
                    color: liked ? 'var(--ivory)' : 'var(--charcoal)',
                  }}
                >
                  <Heart size={15} fill={liked ? 'currentColor' : 'none'} />
                </button>
              </div>
            )}

            {/* Specs */}
            {product.category && (
              <div className="mt-4 pt-6" style={{ borderTop: '1px solid var(--border)' }}>
                <p className="text-[10px] tracking-[0.2em] uppercase mb-4 font-medium" style={{ color: 'var(--warm-gray)' }}>
                  {t('description')}
                </p>
                <dl className="grid grid-cols-2 gap-x-6 gap-y-3">
                  <div>
                    <dt className="text-[10px] tracking-wider uppercase" style={{ color: 'var(--warm-gray)' }}>
                      {lang === 'az' ? 'Kateqoriya' : lang === 'ru' ? 'Категория' : 'Category'}
                    </dt>
                    <dd className="text-xs mt-0.5 capitalize" style={{ color: 'var(--charcoal)' }}>
                      {product.category.replace(/-/g, ' ')}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[10px] tracking-wider uppercase" style={{ color: 'var(--warm-gray)' }}>
                      {lang === 'az' ? 'Brend' : lang === 'ru' ? 'Бренд' : 'Brand'}
                    </dt>
                    <dd className="text-xs mt-0.5" style={{ color: 'var(--charcoal)' }}>{product.brand}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] tracking-wider uppercase" style={{ color: 'var(--warm-gray)' }}>
                      {lang === 'az' ? 'Qiymətləndirmə' : lang === 'ru' ? 'Рейтинг' : 'Rating'}
                    </dt>
                    <dd className="text-xs mt-0.5" style={{ color: 'var(--charcoal)' }}>{product.rating} / 5</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] tracking-wider uppercase" style={{ color: 'var(--warm-gray)' }}>SKU</dt>
                    <dd className="text-xs mt-0.5 uppercase" style={{ color: 'var(--charcoal)' }}>GLM-{product.id.padStart(4, '0')}</dd>
                  </div>
                </dl>
              </div>
            )}
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-20 lg:mt-28">
            <div className="mb-10">
              <p className="text-[10px] tracking-[0.3em] uppercase mb-2" style={{ color: 'var(--gold)' }}>
                {lang === 'az' ? 'Oxşar' : lang === 'ru' ? 'Похожие' : 'Similar'}
              </p>
              <h2 className="font-display text-3xl font-light" style={{ color: 'var(--charcoal)' }}>
                {t('relatedProducts')}
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </SiteLayout>
  )
}
