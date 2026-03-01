'use client'

import { useState } from 'react'
import { useLang } from '@/components/providers/GlamoraProviders'
import { Send, Check } from 'lucide-react'

export default function NewsletterSection() {
  const { t } = useLang()
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) { setSubmitted(true); setEmail('') }
  }

  return (
    <section className="py-20 lg:py-24" style={{ backgroundColor: 'var(--charcoal)' }}>
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10 text-center">
        <p className="text-[10px] tracking-[0.3em] uppercase mb-4" style={{ color: 'var(--gold)' }}>GLAMORA</p>
        <h2 className="font-display font-light text-4xl lg:text-5xl mb-4 text-balance" style={{ color: 'var(--ivory)' }}>
          {t('newsletter')}
        </h2>
        <p className="text-sm font-light mb-10 max-w-md mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
          {t('newsletterSubtitle')}
        </p>

        {submitted ? (
          <div className="flex items-center justify-center gap-3 text-sm" style={{ color: 'var(--gold)' }}>
            <Check size={16} />
            <span className="tracking-wide">
              {t('subscribe')} ✓
            </span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder={t('enterEmail')}
              required
              className="flex-1 px-5 py-3.5 text-sm outline-none transition-all duration-200"
              style={{
                backgroundColor: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: 'var(--ivory)',
                caretColor: 'var(--gold)',
              }}
              onFocus={e => (e.target as HTMLElement).style.borderColor = 'var(--gold)'}
              onBlur={e => (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.12)'}
            />
            <button type="submit" className="btn-gold flex items-center justify-center gap-2 whitespace-nowrap">
              <Send size={13} />
              {t('subscribe')}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
