'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle2, CreditCard, Banknote } from 'lucide-react'
import SiteLayout from '@/components/layout/SiteLayout'
import { useLang, useCart, useAuth } from '@/components/providers/GlamoraProviders'
import { getProductName } from '@/lib/products'

export default function CheckoutPage() {
  const { t, lang } = useLang()
  const { items, subtotal, clearCart } = useCart()
  const { user, addOrder } = useAuth()

  const [payment, setPayment] = useState<'card' | 'cash'>('cash')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const [form, setForm] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || '',
    zipCode: '',
    country: user?.country || 'Azerbaijan',
  })

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    addOrder(items, subtotal)
    clearCart()
    setSuccess(true)
    setLoading(false)
  }

  if (success) {
    return (
      <SiteLayout>
        <div className="min-h-[70vh] flex items-center justify-center px-6 py-16">
          <div className="text-center max-w-md page-enter">
            <CheckCircle2 size={52} strokeWidth={1} className="mx-auto mb-6" style={{ color: 'var(--gold)' }} />
            <h1 className="font-display text-4xl font-light mb-4" style={{ color: 'var(--charcoal)' }}>
              {lang === 'az' ? 'Sifarişiniz Alındı!' : lang === 'ru' ? 'Заказ принят!' : 'Order Placed!'}
            </h1>
            <p className="text-sm font-light mb-8 leading-relaxed" style={{ color: 'var(--warm-gray)' }}>
              {lang === 'az' ? 'Sifarişiniz uğurla qəbul edildi. Tezliklə sizinlə əlaqə saxlanılacaq.' : lang === 'ru' ? 'Ваш заказ успешно принят. Мы свяжемся с вами в ближайшее время.' : 'Your order has been successfully placed. We will contact you shortly.'}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/" className="btn-gold">{lang === 'az' ? 'Ana Səhifəyə' : lang === 'ru' ? 'На главную' : 'Back to Home'}</Link>
              <Link href="/profile" className="btn-ghost">{t('myOrders')}</Link>
            </div>
          </div>
        </div>
      </SiteLayout>
    )
  }

  if (items.length === 0) {
    return (
      <SiteLayout>
        <div className="min-h-[60vh] flex items-center justify-center px-6 page-enter">
          <div className="text-center">
            <p className="font-display text-2xl font-light mb-4" style={{ color: 'var(--charcoal)' }}>
              {t('emptyCart')}
            </p>
            <Link href="/" className="btn-gold">{t('continueShopping')}</Link>
          </div>
        </div>
      </SiteLayout>
    )
  }

  const shippingFields = [
    { key: 'firstName', label: t('firstName'), type: 'text', half: true },
    { key: 'lastName', label: t('lastName'), type: 'text', half: true },
    { key: 'email', label: t('email'), type: 'email', half: true },
    { key: 'phone', label: t('phone'), type: 'tel', half: true },
    { key: 'address', label: t('address'), type: 'text', half: false },
    { key: 'city', label: t('city'), type: 'text', half: true },
    { key: 'zipCode', label: t('zipCode'), type: 'text', half: true },
    { key: 'country', label: t('country'), type: 'text', half: false },
  ]

  return (
    <SiteLayout>
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10 py-10 lg:py-16 page-enter">
        <h1 className="font-display font-light text-4xl lg:text-5xl mb-10" style={{ color: 'var(--charcoal)' }}>
          {t('checkout')}
        </h1>

        <form onSubmit={handlePlaceOrder}>
          <div className="grid lg:grid-cols-[1fr_380px] gap-10 lg:gap-14">

            {/* Left — Form */}
            <div className="space-y-10">

              {/* Shipping */}
              <div>
                <h2 className="font-display text-2xl font-light mb-6" style={{ color: 'var(--charcoal)' }}>
                  {t('shippingInfo')}
                </h2>
                <div className="grid sm:grid-cols-2 gap-5">
                  {shippingFields.map(({ key, label, type, half }) => (
                    <div key={key} className={!half ? 'sm:col-span-2' : ''}>
                      <label className="block text-[10px] tracking-widest uppercase mb-2" style={{ color: 'var(--warm-gray)' }}>
                        {label}
                      </label>
                      <input
                        type={type}
                        value={(form as any)[key]}
                        onChange={set(key)}
                        required
                        className="input-box"
                        placeholder={label}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment */}
              <div>
                <h2 className="font-display text-2xl font-light mb-6" style={{ color: 'var(--charcoal)' }}>
                  {t('paymentMethod')}
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Cash on delivery */}
                  <label
                    className="flex items-center gap-4 p-5 cursor-pointer transition-all duration-200"
                    style={{
                      border: payment === 'cash' ? '1px solid var(--gold)' : '1px solid var(--border)',
                      backgroundColor: payment === 'cash' ? 'rgba(201,169,110,0.06)' : 'var(--card)',
                    }}
                  >
                    <input type="radio" name="payment" value="cash" checked={payment === 'cash'} onChange={() => setPayment('cash')} className="sr-only" />
                    <Banknote size={18} style={{ color: payment === 'cash' ? 'var(--gold)' : 'var(--warm-gray)' }} />
                    <div>
                      <p className="text-xs font-medium tracking-wide" style={{ color: 'var(--charcoal)' }}>{t('cashOnDelivery')}</p>
                      <p className="text-[10px] mt-0.5" style={{ color: 'var(--warm-gray)' }}>
                        {lang === 'az' ? 'Çatdırılma zamanı ödəyin' : lang === 'ru' ? 'Оплата при получении' : 'Pay when delivered'}
                      </p>
                    </div>
                  </label>

                  {/* Card */}
                  <label
                    className="flex items-center gap-4 p-5 cursor-pointer transition-all duration-200"
                    style={{
                      border: payment === 'card' ? '1px solid var(--gold)' : '1px solid var(--border)',
                      backgroundColor: payment === 'card' ? 'rgba(201,169,110,0.06)' : 'var(--card)',
                    }}
                  >
                    <input type="radio" name="payment" value="card" checked={payment === 'card'} onChange={() => setPayment('card')} className="sr-only" />
                    <CreditCard size={18} style={{ color: payment === 'card' ? 'var(--gold)' : 'var(--warm-gray)' }} />
                    <div>
                      <p className="text-xs font-medium tracking-wide" style={{ color: 'var(--charcoal)' }}>{t('creditCard')}</p>
                      <p className="text-[10px] mt-0.5" style={{ color: 'var(--warm-gray)' }}>Visa, Mastercard</p>
                    </div>
                  </label>
                </div>

                {payment === 'card' && (
                  <div className="mt-5 grid sm:grid-cols-2 gap-5">
                    {[
                      { label: t('cardNumber'), placeholder: '•••• •••• •••• ••••', col: 'sm:col-span-2' },
                      { label: t('cardName'), placeholder: lang === 'az' ? 'Kartdakı Ad' : lang === 'ru' ? 'Имя на карте' : 'Name on card', col: 'sm:col-span-2' },
                      { label: t('expiryDate'), placeholder: 'MM/YY', col: '' },
                      { label: t('cvv'), placeholder: '•••', col: '' },
                    ].map(({ label, placeholder, col }) => (
                      <div key={label} className={col}>
                        <label className="block text-[10px] tracking-widest uppercase mb-2" style={{ color: 'var(--warm-gray)' }}>{label}</label>
                        <input type="text" className="input-box" placeholder={placeholder} required />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right — Summary */}
            <div className="h-fit" style={{ border: '1px solid var(--border)', backgroundColor: 'var(--secondary)' }}>
              <div className="p-6 lg:p-8">
                <h2 className="font-display text-xl font-light mb-6" style={{ color: 'var(--charcoal)' }}>
                  {t('orderSummary')}
                </h2>

                {/* Items */}
                <ul className="space-y-4 mb-6 pb-6" style={{ borderBottom: '1px solid var(--border)' }}>
                  {items.map(({ product, quantity }) => (
                    <li key={product.id} className="flex gap-3 items-center">
                      <div className="w-14 h-16 flex-shrink-0 overflow-hidden" style={{ border: '1px solid var(--border)' }}>
                        <img src={product.images[0]} alt={getProductName(product, lang)} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-light line-clamp-2" style={{ color: 'var(--charcoal)' }}>
                          {getProductName(product, lang)}
                        </p>
                        <p className="text-[10px] mt-0.5" style={{ color: 'var(--warm-gray)' }}>
                          ×{quantity}
                        </p>
                      </div>
                      <p className="text-xs font-medium flex-shrink-0" style={{ color: 'var(--charcoal)' }}>
                        {product.price * quantity} AZN
                      </p>
                    </li>
                  ))}
                </ul>

                <div className="space-y-3 pb-5" style={{ borderBottom: '1px solid var(--border)' }}>
                  <div className="flex justify-between">
                    <span className="text-xs" style={{ color: 'var(--warm-gray)' }}>{t('subtotal')}</span>
                    <span className="text-sm" style={{ color: 'var(--charcoal)' }}>{subtotal} AZN</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs" style={{ color: 'var(--warm-gray)' }}>{t('shipping')}</span>
                    <span className="text-xs" style={{ color: 'var(--gold)' }}>{t('freeShipping')}</span>
                  </div>
                </div>

                <div className="flex justify-between pt-5 mb-6">
                  <span className="text-xs tracking-widest uppercase font-medium" style={{ color: 'var(--charcoal)' }}>{t('total')}</span>
                  <span className="font-display text-xl font-light" style={{ color: 'var(--charcoal)' }}>{subtotal} AZN</span>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-gold w-full justify-center"
                  style={{ opacity: loading ? 0.75 : 1 }}
                >
                  {loading
                    ? (lang === 'az' ? 'İşlənir...' : lang === 'ru' ? 'Обработка...' : 'Processing...')
                    : t('placeOrder')}
                </button>

                <p className="text-[10px] text-center mt-4" style={{ color: 'var(--warm-gray)' }}>
                  {lang === 'az' ? 'Məlumatlarınız təhlükəsiz saxlanılır' : lang === 'ru' ? 'Ваши данные защищены' : 'Your information is secure'}
                </p>
              </div>
            </div>

          </div>
        </form>
      </div>
    </SiteLayout>
  )
}
