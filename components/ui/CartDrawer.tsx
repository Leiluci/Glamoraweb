'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import { useLang, useCart } from '@/components/providers/GlamoraProviders'
import { getProductName } from '@/lib/products'

export default function CartDrawer() {
  const { t, lang } = useLang()
  const { items, removeItem, updateQty, subtotal, totalItems, isOpen, setIsOpen } = useCart()

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[200] flex">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        style={{ animation: 'fadeIn .25s ease' }}
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer panel */}
      <div
        className="absolute right-0 top-0 bottom-0 w-full max-w-[420px] flex flex-col"
        style={{ backgroundColor: 'var(--background)', animation: 'slideInRight .3s cubic-bezier(.25,.46,.45,.94)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-3">
            <ShoppingBag size={18} style={{ color: 'var(--charcoal)' }} />
            <span className="text-sm tracking-widest uppercase font-medium" style={{ color: 'var(--charcoal)' }}>
              {t('yourCart')}
            </span>
            {totalItems > 0 && (
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-medium" style={{ backgroundColor: 'var(--gold)', color: 'var(--ivory)' }}>
                {totalItems}
              </span>
            )}
          </div>
          <button onClick={() => setIsOpen(false)} className="p-1 transition-opacity hover:opacity-60" aria-label="Close cart">
            <X size={18} style={{ color: 'var(--charcoal)' }} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-5 px-6 text-center">
              <ShoppingBag size={40} strokeWidth={1} style={{ color: 'var(--border)' }} />
              <div>
                <p className="text-sm font-light" style={{ color: 'var(--charcoal)' }}>{t('emptyCart')}</p>
                <p className="text-xs mt-1" style={{ color: 'var(--warm-gray)' }}>
                  {lang === 'az' ? 'Səbətinizə məhsul əlavə edin' : lang === 'ru' ? 'Добавьте товары в корзину' : 'Add products to your cart'}
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="btn-ghost text-xs"
              >
                {t('continueShopping')}
              </button>
            </div>
          ) : (
            <ul className="divide-y" style={{ borderColor: 'var(--border)' }}>
              {items.map(({ product, quantity }) => {
                const name = getProductName(product, lang)
                return (
                  <li key={product.id} className="flex gap-4 px-6 py-5">
                    {/* Image */}
                    <Link href={`/product/${product.slug}`} onClick={() => setIsOpen(false)}
                      className="flex-shrink-0 w-20 h-24 overflow-hidden" style={{ backgroundColor: 'var(--secondary)' }}>
                      <img src={product.images[0]} alt={name} className="w-full h-full object-cover" />
                    </Link>
                    {/* Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <p className="text-[10px] tracking-widest uppercase" style={{ color: 'var(--warm-gray)' }}>{product.brand}</p>
                        <Link href={`/product/${product.slug}`} onClick={() => setIsOpen(false)}
                          className="text-sm font-light leading-snug line-clamp-2 mt-0.5 transition-colors"
                          style={{ color: 'var(--charcoal)' }}
                          onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--gold)'}
                          onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--charcoal)'}
                        >{name}</Link>
                        <p className="text-sm font-medium mt-1" style={{ color: 'var(--charcoal)' }}>{product.price * quantity} AZN</p>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        {/* Quantity */}
                        <div className="flex items-center" style={{ border: '1px solid var(--border)' }}>
                          <button onClick={() => updateQty(product.id, quantity - 1)} className="qty-btn" aria-label="Decrease">
                            <Minus size={11} />
                          </button>
                          <span className="w-8 text-center text-xs" style={{ color: 'var(--charcoal)' }}>{quantity}</span>
                          <button onClick={() => updateQty(product.id, quantity + 1)} disabled={quantity >= product.stockCount} className="qty-btn" aria-label="Increase">
                            <Plus size={11} />
                          </button>
                        </div>
                        {/* Remove */}
                        <button onClick={() => removeItem(product.id)} aria-label={t('remove')}
                          className="p-1.5 transition-colors duration-200"
                          style={{ color: 'var(--warm-gray)' }}
                          onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#C0564A'}
                          onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--warm-gray)'}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        {/* Footer summary */}
        {items.length > 0 && (
          <div className="border-t px-6 py-5 space-y-4" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--secondary)' }}>
            <div className="flex items-center justify-between">
              <span className="text-xs tracking-widest uppercase" style={{ color: 'var(--warm-gray)' }}>{t('subtotal')}</span>
              <span className="text-sm font-medium" style={{ color: 'var(--charcoal)' }}>{subtotal} AZN</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs tracking-widest uppercase" style={{ color: 'var(--warm-gray)' }}>{t('shipping')}</span>
              <span className="text-xs" style={{ color: 'var(--gold)' }}>{t('freeShipping')}</span>
            </div>
            <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: 'var(--border)' }}>
              <span className="text-xs tracking-widest uppercase font-medium" style={{ color: 'var(--charcoal)' }}>{t('total')}</span>
              <span className="text-base font-medium" style={{ color: 'var(--charcoal)' }}>{subtotal} AZN</span>
            </div>
            <div className="flex flex-col gap-2 pt-1">
              <Link href="/checkout" onClick={() => setIsOpen(false)} className="btn-gold w-full justify-center text-center">
                {t('checkout')}
              </Link>
              <Link href="/cart" onClick={() => setIsOpen(false)}
                className="w-full py-3 text-xs tracking-widest uppercase text-center transition-colors duration-200"
                style={{ color: 'var(--warm-gray)' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--gold)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--warm-gray)'}
              >
                {lang === 'az' ? 'Səbəti Gör' : lang === 'ru' ? 'Открыть корзину' : 'View Cart'}
              </Link>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideInRight { from { transform: translateX(100%) } to { transform: translateX(0) } }
      `}</style>
    </div>
  )
}
