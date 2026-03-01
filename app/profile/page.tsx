'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { User, ShoppingBag, MapPin, CreditCard, LogOut, Edit3, Check, Package } from 'lucide-react'
import SiteLayout from '@/components/layout/SiteLayout'
import { useLang, useAuth } from '@/components/providers/GlamoraProviders'
import { getProductName } from '@/lib/products'

type Tab = 'profile' | 'orders' | 'addresses' | 'payment'

export default function ProfilePage() {
  const { t, lang } = useLang()
  const { user, orders, logout, updateProfile } = useAuth()
  const router = useRouter()
  const [tab, setTab] = useState<Tab>('profile')
  const [editing, setEditing] = useState(false)
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', address: '', city: '', country: '' })

  useEffect(() => {
    if (!user) { router.push('/login'); return }
    setForm({ firstName: user.firstName, lastName: user.lastName, email: user.email, phone: user.phone, address: user.address || '', city: user.city || '', country: user.country || '' })
  }, [user, router])

  if (!user) return null

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    updateProfile(form)
    setEditing(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const tabs: { key: Tab; icon: typeof User; label: string }[] = [
    { key: 'profile', icon: User, label: t('myProfile') },
    { key: 'orders', icon: ShoppingBag, label: t('myOrders') },
    { key: 'addresses', icon: MapPin, label: t('savedAddresses') },
    { key: 'payment', icon: CreditCard, label: t('paymentMethods') },
  ]

  const fields = [
    { key: 'firstName', label: t('firstName'), type: 'text' },
    { key: 'lastName', label: t('lastName'), type: 'text' },
    { key: 'email', label: t('email'), type: 'email' },
    { key: 'phone', label: t('phone'), type: 'tel' },
    { key: 'address', label: t('address'), type: 'text' },
    { key: 'city', label: t('city'), type: 'text' },
    { key: 'country', label: t('country'), type: 'text' },
  ]

  return (
    <SiteLayout>
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10 py-10 lg:py-16 page-enter">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase mb-2" style={{ color: 'var(--gold)' }}>GLAMORA</p>
            <h1 className="font-display font-light text-4xl lg:text-5xl" style={{ color: 'var(--charcoal)' }}>
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-sm mt-1" style={{ color: 'var(--warm-gray)' }}>{user.email}</p>
          </div>
          <button onClick={() => { logout(); router.push('/') }}
            className="flex items-center gap-2 text-xs tracking-widest uppercase transition-colors"
            style={{ color: 'var(--warm-gray)' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#C0564A'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--warm-gray)'}
          >
            <LogOut size={14} /> {t('logout')}
          </button>
        </div>

        <div className="grid lg:grid-cols-[240px_1fr] gap-8 lg:gap-12">

          {/* Sidebar nav */}
          <nav className="flex lg:flex-col gap-1 overflow-x-auto pb-2 lg:pb-0">
            {tabs.map(({ key, icon: Icon, label }) => (
              <button key={key} onClick={() => setTab(key)}
                className="flex items-center gap-3 px-4 py-3 text-xs tracking-wide whitespace-nowrap transition-all duration-200 text-left"
                style={{
                  backgroundColor: tab === key ? 'var(--charcoal)' : 'transparent',
                  color: tab === key ? 'var(--ivory)' : 'var(--warm-gray)',
                  border: tab === key ? 'none' : '1px solid transparent',
                }}
                onMouseEnter={e => { if (tab !== key) (e.currentTarget as HTMLElement).style.color = 'var(--gold)' }}
                onMouseLeave={e => { if (tab !== key) (e.currentTarget as HTMLElement).style.color = 'var(--warm-gray)' }}
              >
                <Icon size={14} />
                {label}
              </button>
            ))}
          </nav>

          {/* Tab content */}
          <div className="min-h-[400px]">

            {/* Profile tab */}
            {tab === 'profile' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-2xl font-light" style={{ color: 'var(--charcoal)' }}>{t('myProfile')}</h2>
                  {!editing ? (
                    <button onClick={() => setEditing(true)} className="flex items-center gap-2 text-xs tracking-widest uppercase transition-colors" style={{ color: 'var(--gold)' }}>
                      <Edit3 size={13} /> {t('editProfile')}
                    </button>
                  ) : null}
                </div>

                {saved && (
                  <div className="flex items-center gap-2 mb-4 px-4 py-3 text-xs" style={{ backgroundColor: 'rgba(201,169,110,0.12)', border: '1px solid rgba(201,169,110,0.3)', color: 'var(--gold-dark)' }}>
                    <Check size={13} />
                    {lang === 'az' ? 'Məlumatlarınız yadda saxlanıldı' : lang === 'ru' ? 'Данные сохранены' : 'Profile saved successfully'}
                  </div>
                )}

                <form onSubmit={handleSave} className="grid sm:grid-cols-2 gap-6">
                  {fields.map(({ key, label, type }) => (
                    <div key={key} className={key === 'address' ? 'sm:col-span-2' : ''}>
                      <label className="block text-[10px] tracking-widest uppercase mb-2" style={{ color: 'var(--warm-gray)' }}>{label}</label>
                      {editing ? (
                        <input type={type} value={(form as any)[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                          className="input-luxury" />
                      ) : (
                        <p className="text-sm py-2 border-b" style={{ color: 'var(--charcoal)', borderColor: 'var(--border)' }}>
                          {(form as any)[key] || <span style={{ color: 'var(--warm-gray)' }}>—</span>}
                        </p>
                      )}
                    </div>
                  ))}

                  {editing && (
                    <div className="sm:col-span-2 flex gap-4 pt-2">
                      <button type="submit" className="btn-gold">{t('saveChanges')}</button>
                      <button type="button" onClick={() => setEditing(false)} className="btn-ghost">
                        {lang === 'az' ? 'Ləğv et' : lang === 'ru' ? 'Отмена' : 'Cancel'}
                      </button>
                    </div>
                  )}
                </form>
              </div>
            )}

            {/* Orders tab */}
            {tab === 'orders' && (
              <div>
                <h2 className="font-display text-2xl font-light mb-6" style={{ color: 'var(--charcoal)' }}>{t('orderHistory')}</h2>
                {orders.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 gap-5 text-center">
                    <Package size={40} strokeWidth={1} style={{ color: 'var(--border)' }} />
                    <p className="text-sm" style={{ color: 'var(--warm-gray)' }}>{t('noOrders')}</p>
                    <Link href="/" className="btn-gold">{lang === 'az' ? 'Alış-verişə Başla' : lang === 'ru' ? 'Начать покупки' : 'Start Shopping'}</Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map(order => (
                      <div key={order.id} className="p-6" style={{ border: '1px solid var(--border)', backgroundColor: 'var(--card)' }}>
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <p className="text-[10px] tracking-widest uppercase" style={{ color: 'var(--warm-gray)' }}>
                              {lang === 'az' ? 'Sifariş #' : lang === 'ru' ? 'Заказ #' : 'Order #'}{order.id.slice(-8).toUpperCase()}
                            </p>
                            <p className="text-xs mt-0.5" style={{ color: 'var(--warm-gray)' }}>
                              {new Date(order.date).toLocaleDateString(lang === 'az' ? 'az-AZ' : lang === 'ru' ? 'ru-RU' : 'en-US')}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="text-[9px] px-3 py-1.5 tracking-widest uppercase" style={{ backgroundColor: 'var(--blush)', color: 'var(--charcoal)' }}>
                              {order.status}
                            </span>
                            <p className="text-sm font-medium mt-2" style={{ color: 'var(--charcoal)' }}>{order.total} AZN</p>
                          </div>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          {order.items.map(({ product, quantity }) => (
                            <div key={product.id} className="w-12 h-14 overflow-hidden relative" style={{ border: '1px solid var(--border)' }}>
                              <img src={product.images[0]} alt={getProductName(product, lang)} className="w-full h-full object-cover" />
                              {quantity > 1 && (
                                <span className="absolute bottom-0.5 right-0.5 text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center"
                                  style={{ backgroundColor: 'var(--gold)', color: 'var(--ivory)' }}>{quantity}</span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Addresses tab */}
            {tab === 'addresses' && (
              <div>
                <h2 className="font-display text-2xl font-light mb-6" style={{ color: 'var(--charcoal)' }}>{t('savedAddresses')}</h2>
                {user.address || user.city ? (
                  <div className="p-6" style={{ border: '1px solid var(--border)', backgroundColor: 'var(--card)', maxWidth: 400 }}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[9px] tracking-widest uppercase px-2.5 py-1" style={{ backgroundColor: 'var(--gold)', color: 'var(--ivory)' }}>
                        {lang === 'az' ? 'Əsas Ünvan' : lang === 'ru' ? 'Основной адрес' : 'Primary Address'}
                      </span>
                    </div>
                    <p className="text-sm font-medium mb-1" style={{ color: 'var(--charcoal)' }}>{user.firstName} {user.lastName}</p>
                    <p className="text-sm font-light" style={{ color: 'var(--warm-gray)' }}>{user.address}</p>
                    <p className="text-sm font-light" style={{ color: 'var(--warm-gray)' }}>{user.city}, {user.country}</p>
                    <p className="text-sm font-light" style={{ color: 'var(--warm-gray)' }}>{user.phone}</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
                    <MapPin size={36} strokeWidth={1} style={{ color: 'var(--border)' }} />
                    <p className="text-sm" style={{ color: 'var(--warm-gray)' }}>
                      {lang === 'az' ? 'Ünvan əlavə edilməyib' : lang === 'ru' ? 'Адрес не добавлен' : 'No address added yet'}
                    </p>
                    <button onClick={() => { setTab('profile'); setEditing(true) }} className="btn-ghost">
                      {t('editProfile')}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Payment tab */}
            {tab === 'payment' && (
              <div>
                <h2 className="font-display text-2xl font-light mb-6" style={{ color: 'var(--charcoal)' }}>{t('paymentMethods')}</h2>
                <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
                  <CreditCard size={36} strokeWidth={1} style={{ color: 'var(--border)' }} />
                  <p className="text-sm" style={{ color: 'var(--warm-gray)' }}>
                    {lang === 'az' ? 'Ödəniş üsulu əlavə edilməyib' : lang === 'ru' ? 'Способ оплаты не добавлен' : 'No payment method added yet'}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--warm-gray)' }}>
                    {lang === 'az' ? 'Ödənişi çatdırılma zamanı nağd ödəyə bilərsiniz' : lang === 'ru' ? 'Оплатите наличными при доставке' : 'Pay with cash on delivery at checkout'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </SiteLayout>
  )
}
