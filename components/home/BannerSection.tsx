'use client'

import Link from 'next/link'
import { useLang } from '@/components/providers/GlamoraProviders'
import { ArrowRight } from 'lucide-react'

export default function BannerSection() {
  const { t, lang } = useLang()

  return (
    <section className="py-20 lg:py-28" style={{ backgroundColor: 'var(--background)' }}>
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-5">

          {/* Banner 1 — Dark */}
          <div className="relative overflow-hidden group" style={{ minHeight: 360 }}>
            <div className="absolute inset-0 product-zoom">
              <img
                src="https://placehold.co/700x400?text=Luxury+Professional+Hair+Care+Salon+Gold+Elegant+Dark+Background"
                alt="GLAMORA professional hair care collection with gold tones"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0" style={{ backgroundColor: 'rgba(42,34,32,0.65)' }} />
            <div className="relative z-10 h-full flex flex-col justify-end p-8 lg:p-10" style={{ minHeight: 360 }}>
              <p className="text-[9px] tracking-[0.25em] uppercase mb-2" style={{ color: 'var(--gold)' }}>
                {lang === 'az' ? 'Saç Baxımı' : lang === 'ru' ? 'Уход за волосами' : 'Hair Care'}
              </p>
              <h3 className="font-display text-2xl lg:text-3xl font-light mb-4 text-balance" style={{ color: 'var(--ivory)' }}>
                {lang === 'az' ? 'Peşəkar Saç\nMüalicəsi' : lang === 'ru' ? 'Профессиональный\nуход за волосами' : 'Professional\nHair Treatment'}
              </h3>
              <Link
                href="/category/hair-care"
                className="flex items-center gap-2 text-xs tracking-widest uppercase transition-colors duration-200"
                style={{ color: 'var(--gold)' }}
              >
                {t('shopNow')} <ArrowRight size={12} />
              </Link>
            </div>
          </div>

          {/* Banner 2 — Light */}
          <div className="grid grid-rows-2 gap-5">
            {/* Sub-banner 1 */}
            <div className="relative overflow-hidden group" style={{ minHeight: 170 }}>
              <div className="absolute inset-0 product-zoom">
                <img
                  src="https://placehold.co/700x200?text=Nail+Care+Gel+Polish+Collection+Blush+Pink+Elegant"
                  alt="GLAMORA nail care gel polish collection in blush pink"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0" style={{ backgroundColor: 'rgba(61,53,48,0.45)' }} />
              <div className="relative z-10 h-full flex flex-col justify-end p-6">
                <p className="text-[9px] tracking-[0.25em] uppercase mb-1.5" style={{ color: 'var(--blush)' }}>
                  {lang === 'az' ? 'Dırnak Baxımı' : lang === 'ru' ? 'Ногтевой сервис' : 'Nail Care'}
                </p>
                <h4 className="font-display text-xl font-light" style={{ color: 'var(--ivory)' }}>
                  {lang === 'az' ? 'Gel Lak & Shellac' : lang === 'ru' ? 'Гель-лак & Шеллак' : 'Gel Polish & Shellac'}
                </h4>
              </div>
            </div>

            {/* Sub-banner 2 */}
            <div className="relative overflow-hidden group" style={{ minHeight: 170 }}>
              <div className="absolute inset-0 product-zoom">
                <img
                  src="https://placehold.co/700x200?text=Face+Care+Luxury+Serums+Creams+Skincare+Glow+Nude+Beige"
                  alt="GLAMORA face care luxury serums and creams skincare glow"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0" style={{ backgroundColor: 'rgba(61,53,48,0.45)' }} />
              <div className="relative z-10 h-full flex flex-col justify-end p-6">
                <p className="text-[9px] tracking-[0.25em] uppercase mb-1.5" style={{ color: 'var(--nude)' }}>
                  {lang === 'az' ? 'Üz Baxımı' : lang === 'ru' ? 'Уход за лицом' : 'Face Care'}
                </p>
                <h4 className="font-display text-xl font-light" style={{ color: 'var(--ivory)' }}>
                  {lang === 'az' ? 'Serum & Kremlər' : lang === 'ru' ? 'Сыворотки & Кремы' : 'Serums & Creams'}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
