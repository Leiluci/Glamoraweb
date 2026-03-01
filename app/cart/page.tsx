'use client'

import Link from 'next/link'
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import SiteLayout from '@/components/layout/SiteLayout'
import { useLang, useCart } from '@/components/providers/GlamoraProviders'
import { getProductName } from '@/lib/products'

export default function CartPage() {
  const { t, lang } = useLang()
  const { items, removeItem, updateQty, subtotal, clearCart } = useCart()

  return (
    <SiteLayout>
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10 py-10 lg:py-16 page-enter">
        <h1 className="font-display font-light text-4xl lg:text-5xl mb-10" style={{ color: 'var(--charcoal)' }}>
          {t('yourCart')}
        </h1>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-6 text-center">
            <ShoppingBag size={48} strokeWidth={1} style={{ color: 'var(--border)' }} />
            <div>
              <p className="font-display text-2xl font-light mb-2" style={{ color: 'var(--charcoal)' }}>{t('emptyCart')}</p>
              <p className="text-sm" style={{ color: 'var(--warm-gray)' }}>
                {lang === 'az' ? 'Bəyəndiyiniz məhsulları səbətə əlavə edin' : lang === 'ru' ? 'Добавьте понравившиеся товары в корзину' : 'Add your favourite products to the cart'}
              </p>
            </div>
            <Link href="/" className="btn-gold">{t('continueShopping')}</Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_360px] gap-10 lg:gap-14">
            {/* Items */}
            <div>
              <div className="hidden lg:grid grid-cols-[1fr_120px_120px_48px] gap-4 pb-4 mb-2 text-[10px] tracking-widest uppercase"
                style={{ color: 'var(--warm-gray)', borderBottom: '1px solid var(--border)' }}>
                <span>{lang === 'az' ? 'Məhsul' : lang === 'ru' ? 'Товар' : 'Product'}</span>
                <span className="text-center">{t('quantity')}</span>
                <span className="text-right">{t('price')}</span>
                <span />
              </div>

              <ul className="divide-y" style={{ borderColor: 'var(--border)' }}>
                {items.map(({ product, quantity }) => {
                  const name = getProductName(product, lang)
                  return (
                    <li key={product.id} className="grid lg:grid-cols-[1fr_120px_120px_48px] gap-4 py-6 items-center">
                      {/* Product */}
                      <div className="flex gap-4 items-start">
                        <Link href={`/product/${product.slug}`}
                          className="w-20 h-24 flex-shrink-0 overflow-hidden" style={{ backgroundColor: 'var(--secondary)' }}>
                          <img src={product.images[0]} alt={name} className="w-full h-full object-cover" />
                        </Link>
                        <div>
                          <p className="text-[10px] tracking-widest uppercase mb-0.5" style={{ color: 'var(--warm-gray)' }}>{product.brand}</p>
                          <Link href={`/product/${product.slug}`}
                            className="text-sm font-light leading-snug line-clamp-2 block transition-colors"
                            style={{ color: 'var(--charcoal)' }}
                            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--gold)'}
                            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--charcoal)'}
                          >
                            {name}
                          </Link>
                          <p className="text-[10px] mt-1" style={{ color: product.inStock ? 'var(--gold)' : 'var(--warm-gray)' }}>
                            {product.inStock ? t('inStock') : t('outOfStock')}
                          </p>
                          {/* Mobile price */}
                          <p className="text-sm font-medium mt-2 lg:hidden" style={{ color: 'var(--charcoal)' }}>
                            {product.price * quantity} AZN
                          </p>
                        </div>
                      </div>

                      {/* Quantity */}
                      <div className="flex items-center lg:justify-center">
                        <div className="flex items-center" style={{ border: '1px solid var(--border)' }}>
                          <button onClick={() => updateQty(product.id, quantity - 1)} className="qty-btn"><Minus size={11} /></button>
                          <span className="w-8 text-center text-xs" style={{ color: 'var(--charcoal)' }}>{quantity}</span>
                          <button onClick={() => updateQty(product.id, quantity + 1)} disabled={quantity >= product.stockCount} className="qty-btn"><Plus size={11} /></button>
                        </div>
                      </div>

                      {/* Price (desktop) */}
                      <p className="text-sm font-medium text-right hidden lg:block" style={{ color: 'var(--charcoal)' }}>
                        {product.price * quantity} AZN
                      </p>

                      {/* Remove */}
                      <div className="flex lg:justify-end">
                        <button onClick={() => removeItem(product.id)} aria-label={t('remove')}
                          className="p-2 transition-colors"
                          style={{ color: 'var(--warm-gray)' }}
                          onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#C0564A'}
                          onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--warm-gray)'}
                        ><Trash2 size={15} /></button>
                      </div>
                    </li>
                  )
                })}
              </ul>

              <div className="flex items-center justify-between mt-6 pt-6" style={{ borderTop: '1px solid var(--border)' }}>
                <Link href="/" className="text-xs tracking-widest uppercase transition-colors"
                  style={{ color: 'var(--warm-gray)' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--gold)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--warm-gray)'}
                >
                  ← {t('continueShopping')}
                </Link>
                <button onClick={clearCart} className="text-xs tracking-widest uppercase transition-colors"
                  style={{ color: 'var(--warm-gray)' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#C0564A'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--warm-gray)'}
                >
                  {lang === 'az' ? 'Hamısını Sil' : lang === 'ru' ? 'Очистить корзину' : 'Clear Cart'}
                </button>
              </div>
            </div>

            {/* Summary */}
            <div className="h-fit" style={{ backgroundColor: 'var(--secondary)', border: '1px solid var(--border)' }}>
              <div className="p-6 lg:p-8">
                <h2 className="font-display text-xl font-light mb-6" style={{ color: 'var(--charcoal)' }}>
                  {t('orderSummary')}
                </h2>
                <div className="space-y-3 pb-5" style={{ borderBottom: '1px solid var(--border)' }}>
                  <div className="flex justify-between">
                    <span className="text-xs tracking-wide" style={{ color: 'var(--warm-gray)' }}>{t('subtotal')}</span>
                    <span className="text-sm" style={{ color: 'var(--charcoal)' }}>{subtotal} AZN</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs tracking-wide" style={{ color: 'var(--warm-gray)' }}>{t('shipping')}</span>
                    <span className="text-xs" style={{ color: 'var(--gold)' }}>{t('freeShipping')}</span>
                  </div>
                </div>
                <div className="flex justify-between pt-5 mb-6">
                  <span className="text-xs tracking-widest uppercase font-medium" style={{ color: 'var(--charcoal)' }}>{t('total')}</span>
                  <span className="font-display text-xl font-light" style={{ color: 'var(--charcoal)' }}>{subtotal} AZN</span>
                </div>
                <Link href="/checkout" className="btn-gold w-full justify-center text-center block">
                  {t('checkout')}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </SiteLayout>
  )
}
