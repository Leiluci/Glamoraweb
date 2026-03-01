'use client'

import Link from 'next/link'
import { useLang } from '@/components/providers/GlamoraProviders'
import { useState } from 'react'
import { Instagram, Facebook, Youtube, Send } from 'lucide-react'

export default function Footer() {
  const { t, lang } = useLang()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) { setSubscribed(true); setEmail('') }
  }

  const categoryLinks = [
    { href: '/category/hair-care', labelKey: 'hairCare' },
    { href: '/category/nail-care', labelKey: 'nailCare' },
    { href: '/category/face-care', labelKey: 'faceCare' },
    { href: '/category/makeup', labelKey: 'makeup' },
    { href: '/category/cosmetology-devices', labelKey: 'cosmetologyDevices' },
    { href: '/category/laser-equipment', labelKey: 'laserEquipment' },
    { href: '/category/professional-tools', labelKey: 'professionalTools' },
  ] as const

  const infoLinks = [
    { href: '/about', labelKey: 'aboutUs' },
    { href: '/contact', labelKey: 'contact' },
    { href: '/privacy', labelKey: 'privacyPolicy' },
    { href: '/terms', labelKey: 'termsConditions' },
  ] as const

  return (
    <footer style={{ backgroundColor: 'var(--charcoal)', color: 'var(--cream)' }}>
      {/* Features strip */}
      <div className="border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { title: t('premiumQuality'), desc: t('premiumQualityDesc') },
            { title: t('fastDelivery'), desc: t('fastDeliveryDesc') },
            { title: t('expertSupport'), desc: t('expertSupportDesc') },
            { title: t('securePayment'), desc: t('securePaymentDesc') },
          ].map((f) => (
            <div key={f.title} className="flex flex-col items-center gap-2">
              <div className="w-6 h-px mb-1" style={{ backgroundColor: 'var(--gold)' }} />
              <p className="text-xs tracking-widest uppercase font-medium" style={{ color: 'var(--ivory)' }}>{f.title}</p>
              <p className="text-xs font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main grid */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10 py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <Link href="/" className="font-display text-2xl tracking-[0.22em] block mb-4" style={{ color: 'var(--ivory)' }}>
            GLAMORA
          </Link>
          <p className="text-xs font-light leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.45)', maxWidth: 200 }}>
            {lang === 'az' && 'Premium gözəllik məhsulları və peşəkar salon avadanlığı.'}
            {lang === 'en' && 'Premium beauty products and professional salon equipment.'}
            {lang === 'ru' && 'Премиальные средства красоты и профессиональное оборудование.'}
          </p>
          <div className="flex items-center gap-3">
            {[{ Icon: Instagram, href: '#', label: 'Instagram' }, { Icon: Facebook, href: '#', label: 'Facebook' }, { Icon: Youtube, href: '#', label: 'YouTube' }, { Icon: Send, href: '#', label: 'Telegram' }].map(({ Icon, href, label }) => (
              <a key={label} href={href} aria-label={label}
                className="w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200"
                style={{ border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.4)' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--gold)'; el.style.color = 'var(--gold)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(255,255,255,0.15)'; el.style.color = 'rgba(255,255,255,0.4)' }}
              ><Icon size={13} /></a>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-xs tracking-widest uppercase mb-5 font-medium" style={{ color: 'var(--gold)' }}>{t('shop')}</h4>
          <ul className="space-y-3">
            {categoryLinks.map(({ href, labelKey }) => (
              <li key={href}>
                <Link href={href} className="text-xs font-light transition-colors duration-200"
                  style={{ color: 'rgba(255,255,255,0.5)' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--gold)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)'}
                >{t(labelKey)}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Info */}
        <div>
          <h4 className="text-xs tracking-widest uppercase mb-5 font-medium" style={{ color: 'var(--gold)' }}>{t('aboutUs')}</h4>
          <ul className="space-y-3">
            {infoLinks.map(({ href, labelKey }) => (
              <li key={href}>
                <Link href={href} className="text-xs font-light transition-colors duration-200"
                  style={{ color: 'rgba(255,255,255,0.5)' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--gold)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)'}
                >{t(labelKey)}</Link>
              </li>
            ))}
            <li>
              <a href="tel:+994501234567" className="text-xs font-light transition-colors duration-200"
                style={{ color: 'rgba(255,255,255,0.5)' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--gold)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)'}
              >+994 50 123 45 67</a>
            </li>
            <li>
              <a href="mailto:info@glamora.az" className="text-xs font-light transition-colors duration-200"
                style={{ color: 'rgba(255,255,255,0.5)' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--gold)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)'}
              >info@glamora.az</a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-xs tracking-widest uppercase mb-5 font-medium" style={{ color: 'var(--gold)' }}>{t('newsletter')}</h4>
          <p className="text-xs font-light leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.45)' }}>{t('newsletterSubtitle')}</p>
          {subscribed ? (
            <p className="text-xs tracking-wide" style={{ color: 'var(--gold)' }}>
              {lang === 'az' ? 'Uğurla abunə oldunuz!' : lang === 'ru' ? 'Вы успешно подписались!' : 'Successfully subscribed!'}
            </p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex border-b transition-colors duration-200" style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder={t('enterEmail')} required
                className="flex-1 bg-transparent text-xs outline-none py-2"
                style={{ color: 'var(--ivory)', caretColor: 'var(--gold)' }}
              />
              <button type="submit" className="pl-3 transition-colors duration-200" style={{ color: 'rgba(255,255,255,0.4)' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--gold)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.4)'}
                aria-label={t('subscribe')}
              ><Send size={14} /></button>
            </form>
          )}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t px-6 lg:px-10 py-5" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
        <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs font-light" style={{ color: 'rgba(255,255,255,0.3)' }}>
            &copy; {new Date().getFullYear()} GLAMORA. {t('allRightsReserved')}.
          </p>
          <div className="flex items-center gap-4">
            <img src="https://placehold.co/40x24?text=VISA" alt="Visa accepted" className="opacity-30 hover:opacity-60 transition-opacity" />
            <img src="https://placehold.co/40x24?text=MC" alt="Mastercard accepted" className="opacity-30 hover:opacity-60 transition-opacity" />
          </div>
        </div>
      </div>
    </footer>
  )
}
