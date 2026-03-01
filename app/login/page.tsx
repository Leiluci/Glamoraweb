'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff } from 'lucide-react'
import SiteLayout from '@/components/layout/SiteLayout'
import { useLang, useAuth } from '@/components/providers/GlamoraProviders'

export default function LoginPage() {
  const { t, lang } = useLang()
  const { login } = useAuth()
  const router = useRouter()

  const [form, setForm] = useState({ email: '', password: '' })
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    await new Promise(r => setTimeout(r, 600))
    const ok = login(form.email, form.password)
    setLoading(false)
    if (ok) {
      router.push('/profile')
    } else {
      setError(lang === 'az' ? 'E-poçt və ya şifrə yanlışdır' : lang === 'ru' ? 'Неверный email или пароль' : 'Invalid email or password')
    }
  }

  return (
    <SiteLayout>
      <div className="min-h-[80vh] flex items-center justify-center px-6 py-16" style={{ backgroundColor: 'var(--cream)' }}>
        <div className="w-full max-w-[440px] page-enter">

          {/* Logo */}
          <div className="text-center mb-10">
            <Link href="/" className="font-display text-3xl tracking-[0.25em]" style={{ color: 'var(--charcoal)' }}>
              GLAMORA
            </Link>
            <p className="text-[10px] tracking-[0.25em] uppercase mt-1" style={{ color: 'var(--warm-gray)' }}>
              {t('signInToAccount')}
            </p>
          </div>

          {/* Card */}
          <div className="p-8 lg:p-10" style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}>
            <h1 className="font-display text-2xl font-light mb-8 text-center" style={{ color: 'var(--charcoal)' }}>
              {t('welcomeBack')}
            </h1>

            {error && (
              <div className="mb-6 px-4 py-3 text-xs text-center" style={{ backgroundColor: 'rgba(192,86,74,0.08)', border: '1px solid rgba(192,86,74,0.2)', color: '#C0564A' }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-[10px] tracking-widest uppercase mb-2" style={{ color: 'var(--warm-gray)' }}>
                  {t('email')}
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  required
                  className="input-luxury"
                  placeholder="email@example.com"
                />
              </div>

              <div>
                <label className="block text-[10px] tracking-widest uppercase mb-2" style={{ color: 'var(--warm-gray)' }}>
                  {t('password')}
                </label>
                <div className="relative">
                  <input
                    type={showPw ? 'text' : 'password'}
                    value={form.password}
                    onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                    required
                    className="input-luxury pr-10"
                    placeholder="••••••••"
                  />
                  <button type="button" onClick={() => setShowPw(v => !v)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 p-1 transition-colors"
                    style={{ color: 'var(--warm-gray)' }}>
                    {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
                <div className="flex justify-end mt-2">
                  <span className="text-xs cursor-pointer transition-colors" style={{ color: 'var(--warm-gray)' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--gold)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--warm-gray)'}
                  >
                    {t('forgotPassword')}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-gold w-full justify-center mt-2"
                style={{ opacity: loading ? 0.7 : 1 }}
              >
                {loading
                  ? (lang === 'az' ? 'Giriş edilir...' : lang === 'ru' ? 'Вход...' : 'Signing in...')
                  : t('signIn')}
              </button>
            </form>

            <p className="text-center text-xs mt-6" style={{ color: 'var(--warm-gray)' }}>
              {t('noAccount')}{' '}
              <Link href="/register" className="transition-colors font-medium" style={{ color: 'var(--gold)' }}>
                {t('signUp')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </SiteLayout>
  )
}
