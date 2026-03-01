'use client'

import Link from 'next/link'
import { useLang } from '@/components/providers/GlamoraProviders'
import { ArrowRight } from 'lucide-react'

export default function HeroSection() {
  const { t, lang } = useLang()

  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: 'var(--cream)', minHeight: '88vh' }}>
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10 h-full">
        <div className="grid lg:grid-cols-2 items-center gap-10 py-20 lg:py-28" style={{ minHeight: '88vh' }}>

          {/* Left — Text */}
          <div className="order-2 lg:order-1 page-enter">
            <p className="text-[10px] tracking-[0.3em] uppercase mb-6 font-medium" style={{ color: 'var(--gold)' }}>
              {lang === 'az' ? 'Lüks Gözəllik Dünyası' : lang === 'ru' ? 'Мир роскошной красоты' : 'The World of Luxury Beauty'}
            </p>

            <h1 className="font-display font-light leading-[1.05] text-balance mb-6" style={{ color: 'var(--charcoal)', fontSize: 'clamp(2.8rem, 6vw, 5rem)' }}>
              {t('heroTitle')}
              <br />
              <em className="not-italic" style={{ color: 'var(--gold)' }}>{t('heroTitleSpan')}</em>
            </h1>

            <p className="text-base font-light leading-relaxed mb-10 max-w-[480px]" style={{ color: 'var(--warm-gray)' }}>
              {t('heroSubtitle')}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link href="/category/face-care" className="btn-gold flex items-center gap-2">
                {t('shopNow')}
                <ArrowRight size={13} />
              </Link>
              <Link href="/category/hair-care" className="btn-ghost">
                {t('discoverCollection')}
              </Link>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 mt-14 pt-8 border-t" style={{ borderColor: 'var(--border)' }}>
              {[
                { num: '500+', label: lang === 'az' ? 'Məhsul' : lang === 'ru' ? 'Продуктов' : 'Products' },
                { num: '50+', label: lang === 'az' ? 'Brend' : lang === 'ru' ? 'Брендов' : 'Brands' },
                { num: '10K+', label: lang === 'az' ? 'Müştəri' : lang === 'ru' ? 'Клиентов' : 'Clients' },
              ].map(({ num, label }) => (
                <div key={label}>
                  <p className="font-display text-2xl font-light" style={{ color: 'var(--charcoal)' }}>{num}</p>
                  <p className="text-[10px] tracking-widest uppercase mt-0.5" style={{ color: 'var(--warm-gray)' }}>{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Hero image */}
          <div className="order-1 lg:order-2 relative page-enter">
            <div className="relative mx-auto lg:ml-auto" style={{ maxWidth: 480 }}>
              {/* Decorative frame */}
              <div className="absolute -inset-4 lg:-inset-6" style={{ border: '1px solid var(--border)', zIndex: 0 }} />

              {/* Main image */}
              <div className="relative overflow-hidden" style={{ aspectRatio: '3/4', zIndex: 1 }}>
                <img
                  src="https://placehold.co/600x800?text=Luxury+Beauty+Products+Flatlay+Gold+Serums+Creams+Elegant+Nude+Tones"
                  alt="GLAMORA luxury beauty products flatlay with gold serums and creams"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-5 -left-5 lg:-left-10 py-4 px-5 shadow-lg z-10"
                style={{ backgroundColor: 'var(--charcoal)', maxWidth: 200 }}>
                <p className="text-[9px] tracking-[0.2em] uppercase mb-1" style={{ color: 'var(--gold)' }}>
                  {lang === 'az' ? 'Yeni Gəliş' : lang === 'ru' ? 'Новинки' : 'New Arrivals'}
                </p>
                <p className="text-xs font-light" style={{ color: 'var(--ivory)' }}>
                  {lang === 'az' ? 'Yaz 2025 Kolleksiyası' : lang === 'ru' ? 'Весенняя коллекция 2025' : 'Spring 2025 Collection'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle decorative lines */}
      <div className="absolute top-0 right-0 w-px h-full opacity-20" style={{ backgroundColor: 'var(--gold)' }} />
    </section>
  )
}
