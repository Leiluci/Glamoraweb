'use client'

import { useLang } from '@/components/providers/GlamoraProviders'
import { Award, Truck, Headphones, ShieldCheck } from 'lucide-react'

export default function FeaturesStrip() {
  const { t } = useLang()

  const features = [
    { icon: Award, titleKey: 'premiumQuality', descKey: 'premiumQualityDesc' },
    { icon: Truck, titleKey: 'fastDelivery', descKey: 'fastDeliveryDesc' },
    { icon: Headphones, titleKey: 'expertSupport', descKey: 'expertSupportDesc' },
    { icon: ShieldCheck, titleKey: 'securePayment', descKey: 'securePaymentDesc' },
  ]

  return (
    <section style={{ backgroundColor: 'var(--secondary)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10 py-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map(({ icon: Icon, titleKey, descKey }) => (
            <div key={titleKey} className="flex flex-col items-center text-center gap-3 group">
              <div className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                style={{ border: '1px solid var(--border)', backgroundColor: 'transparent' }}>
                <Icon size={16} style={{ color: 'var(--gold)' }} />
              </div>
              <div>
                <p className="text-xs tracking-widest uppercase font-medium mb-1" style={{ color: 'var(--charcoal)' }}>{t(titleKey as any)}</p>
                <p className="text-xs font-light leading-relaxed" style={{ color: 'var(--warm-gray)' }}>{t(descKey as any)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
