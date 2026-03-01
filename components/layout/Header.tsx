'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useLang, useCart, useFavorites, useAuth } from '@/components/providers/GlamoraProviders'
import type { Language } from '@/lib/i18n'
import { Search, Heart, ShoppingBag, User, ChevronDown, Menu, X, Globe, LogOut } from 'lucide-react'

const megaMenuData = [
  { key: 'hairCare', slug: 'hair-care', subs: [{ key: 'hairTreatment', slug: 'hair-treatment' }, { key: 'hairColoring', slug: 'hair-coloring' }, { key: 'keratin', slug: 'keratin' }, { key: 'bioPerm', slug: 'bio-perm' }] },
  { key: 'nailCare', slug: 'nail-care', subs: [{ key: 'gelPolish', slug: 'gel-polish' }, { key: 'regularPolish', slug: 'regular-polish' }, { key: 'shellac', slug: 'shellac' }, { key: 'nailDevices', slug: 'nail-devices' }, { key: 'nailStickers', slug: 'nail-stickers' }, { key: 'nailAccessories', slug: 'nail-accessories' }] },
  { key: 'cosmetologyDevices', slug: 'cosmetology-devices', subs: [{ key: 'facialMachines', slug: 'facial-machines' }, { key: 'professionalSkincare', slug: 'professional-skincare' }, { key: 'beautyDevices', slug: 'beauty-devices' }] },
  { key: 'makeup', slug: 'makeup', subs: [{ key: 'makeupTools', slug: 'makeup-tools' }, { key: 'makeupProducts', slug: 'makeup-products' }] },
  { key: 'faceCare', slug: 'face-care', subs: [{ key: 'serums', slug: 'serums' }, { key: 'creams', slug: 'creams' }, { key: 'masks', slug: 'masks' }, { key: 'skincaresets', slug: 'skincare-sets' }] },
  { key: 'laserEquipment', slug: 'laser-equipment', subs: [{ key: 'laserDevices', slug: 'laser-devices' }, { key: 'laserAccessories', slug: 'laser-accessories' }] },
  { key: 'professionalTools', slug: 'professional-tools', subs: [{ key: 'salonEquipment', slug: 'salon-equipment' }, { key: 'sterilization', slug: 'sterilization' }, { key: 'beautyInstruments', slug: 'beauty-instruments' }] },
] as const

export default function Header() {
  const { t, lang: language, setLang: setLanguage } = useLang()
  const { totalItems, setIsOpen: setCartOpen } = useCart()
  const { favorites } = useFavorites()
  const { user, logout } = useAuth()
  const isAuthenticated = !!user

  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [langOpen, setLangOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mobileCategory, setMobileCategory] = useState<string | null>(null)

  const searchRef = useRef<HTMLInputElement>(null)
  const langRef = useRef<HTMLDivElement>(null)
  const userRef = useRef<HTMLDivElement>(null)
  const menuTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus()
  }, [searchOpen])

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false)
      if (userRef.current && !userRef.current.contains(e.target as Node)) setUserMenuOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleMenuEnter = (key: string) => {
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current)
    setActiveMenu(key)
  }
  const handleMenuLeave = () => {
    menuTimeoutRef.current = setTimeout(() => setActiveMenu(null), 180)
  }

  const LANGS: { code: Language; label: string }[] = [
    { code: 'az', label: 'AZ' },
    { code: 'en', label: 'EN' },
    { code: 'ru', label: 'RU' },
  ]

  return (
    <>
      {/* Top Bar */}
      <div className="bg-charcoal text-ivory text-center py-2 px-4 text-xs tracking-widest uppercase font-light">
        {t('freeShipping')} — {language === 'az' ? '200 AZN-dən yuxarı sifarişlər' : language === 'ru' ? 'при заказе от 200 AZN' : 'on orders over 200 AZN'}
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-ivory/95 backdrop-blur-md shadow-[0_2px_20px_rgba(61,53,48,0.08)]'
            : 'bg-ivory'
        } border-b border-border`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="relative flex items-center justify-between h-16 lg:h-20">

            {/* Left: Logo (always far left) */}
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="font-display text-2xl lg:text-3xl tracking-[0.25em] text-charcoal hover:text-gold transition-colors duration-300 flex-shrink-0"
              >
                GLAMORA
              </Link>
              {/* Hamburger (mobile only) */}
              <button
                className="lg:hidden text-charcoal hover:text-gold transition-colors ml-1"
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
              >
                <Menu size={22} />
              </button>
            </div>

            {/* Center: Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
              {megaMenuData.map((cat) => (
                <div
                  key={cat.key}
                  className="relative"
                  onMouseEnter={() => handleMenuEnter(cat.key)}
                  onMouseLeave={handleMenuLeave}
                >
                  <Link
                    href={`/category/${cat.slug}`}
                    className={`flex items-center gap-1 px-3 py-2 text-xs tracking-widest uppercase font-medium transition-colors duration-200 ${
                      activeMenu === cat.key ? 'text-gold' : 'text-charcoal hover:text-gold'
                    }`}
                  >
                    {t(cat.key)}
                    <ChevronDown
                      size={11}
                      className={`transition-transform duration-200 ${activeMenu === cat.key ? 'rotate-180' : ''}`}
                    />
                  </Link>

                  {/* Mega Menu Dropdown */}
                  {activeMenu === cat.key && (
                    <div
                      className="mega-menu-animate absolute top-full left-0 bg-ivory border border-border shadow-[0_8px_40px_rgba(61,53,48,0.12)] min-w-[220px] py-6 px-6 z-50"
                      onMouseEnter={() => handleMenuEnter(cat.key)}
                      onMouseLeave={handleMenuLeave}
                    >
                      <p className="text-[9px] tracking-[0.2em] uppercase text-warm-gray mb-4 font-medium">
                        {t(cat.key)}
                      </p>
                      <ul className="space-y-1">
                        {cat.subs.map((sub) => (
                          <li key={sub.key}>
                            <Link
                              href={`/category/${cat.slug}/${sub.slug}`}
                              className="block text-sm text-charcoal hover:text-gold py-1.5 transition-colors hover-gold-line"
                              onClick={() => setActiveMenu(null)}
                            >
                              {t(sub.key)}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right: Actions */}
            <div className="flex items-center gap-1 lg:gap-3">
              {/* Search */}
              <button
                className="p-2 text-charcoal hover:text-gold transition-colors"
                onClick={() => setSearchOpen(!searchOpen)}
                aria-label={t('search')}
              >
                <Search size={18} />
              </button>

              {/* Language Switcher */}
              <div ref={langRef} className="relative hidden sm:block">
                <button
                  className="flex items-center gap-1 p-2 text-xs tracking-widest uppercase text-charcoal hover:text-gold transition-colors"
                  onClick={() => setLangOpen(!langOpen)}
                >
                  <Globe size={14} />
                  <span>{language.toUpperCase()}</span>
                </button>
                {langOpen && (
                  <div className="mega-menu-animate absolute right-0 top-full mt-1 bg-ivory border border-border shadow-lg py-2 min-w-[80px] z-50">
                    {LANGS.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => { setLanguage(l.code); setLangOpen(false) }}
                        className={`w-full text-left px-4 py-2 text-xs tracking-widest uppercase transition-colors ${
                          language === l.code ? 'text-gold font-medium' : 'text-charcoal hover:text-gold'
                        }`}
                      >
                        {l.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Favorites */}
              <Link href="/favorites" className="relative p-2 text-charcoal hover:text-gold transition-colors" aria-label={t('favorites')}>
                <Heart size={18} />
                {favorites.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-blush text-charcoal text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-medium">
                    {favorites.length}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <button onClick={() => setCartOpen(true)} className="relative p-2 text-charcoal hover:text-gold transition-colors" aria-label={t('cart')}>
                <ShoppingBag size={18} />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-gold text-ivory text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-medium">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* User */}
              <div ref={userRef} className="relative">
                <button
                  className="p-2 text-charcoal hover:text-gold transition-colors"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  aria-label={t('account')}
                >
                  <User size={18} />
                </button>
                {userMenuOpen && (
                  <div className="mega-menu-animate absolute right-0 top-full mt-1 bg-ivory border border-border shadow-lg py-3 min-w-[180px] z-50">
                    {isAuthenticated ? (
                      <>
                        <div className="px-4 pb-3 border-b border-border">
                          <p className="text-xs text-warm-gray">{t('account')}</p>
                          <p className="text-sm font-medium text-charcoal truncate">
                            {user?.firstName} {user?.lastName}
                          </p>
                        </div>
                        <Link href="/profile" className="block px-4 py-2 text-sm text-charcoal hover:text-gold transition-colors" onClick={() => setUserMenuOpen(false)}>
                          {t('myProfile')}
                        </Link>
                        <Link href="/profile" className="block px-4 py-2 text-sm text-charcoal hover:text-gold transition-colors" onClick={() => setUserMenuOpen(false)}>
                          {t('myOrders')}
                        </Link>
                        <button
                          className="w-full text-left px-4 py-2 text-sm text-warm-gray hover:text-destructive transition-colors flex items-center gap-2"
                          onClick={() => { logout(); setUserMenuOpen(false) }}
                        >
                          <LogOut size={14} />
                          {t('logout')}
                        </button>
                      </>
                    ) : (
                      <>
                        <Link href="/login" className="block px-4 py-2 text-sm text-charcoal hover:text-gold transition-colors" onClick={() => setUserMenuOpen(false)}>
                          {t('login')}
                        </Link>
                        <Link href="/register" className="block px-4 py-2 text-sm text-charcoal hover:text-gold transition-colors" onClick={() => setUserMenuOpen(false)}>
                          {t('register')}
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="border-t border-border bg-ivory px-6 lg:px-10 py-4">
            <div className="max-w-[600px] mx-auto flex items-center gap-4">
              <Search size={16} className="text-warm-gray flex-shrink-0" />
              <input
                ref={searchRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('search')}
                className="input-luxury flex-1"
                onKeyDown={(e) => {
                  if (e.key === 'Escape') setSearchOpen(false)
                  if (e.key === 'Enter' && searchQuery.trim()) {
                    setSearchOpen(false)
                    setSearchQuery('')
                  }
                }}
              />
              <button onClick={() => setSearchOpen(false)} className="text-warm-gray hover:text-charcoal transition-colors">
                <X size={16} />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Menu Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div className="absolute inset-0 bg-charcoal/40 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-[85vw] max-w-[360px] bg-ivory overflow-y-auto">
            {/* Mobile Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <span className="font-display text-xl tracking-[0.2em] text-charcoal">GLAMORA</span>
              <button onClick={() => setMenuOpen(false)} className="text-warm-gray hover:text-charcoal">
                <X size={20} />
              </button>
            </div>

            {/* Language (mobile) */}
            <div className="px-6 py-4 border-b border-border flex items-center gap-3">
              <Globe size={14} className="text-warm-gray" />
              {LANGS.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLanguage(l.code)}
                  className={`text-xs tracking-widest uppercase px-2 py-1 transition-colors ${
                    language === l.code ? 'text-gold font-medium' : 'text-warm-gray hover:text-gold'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>

            {/* Mobile Nav */}
            <nav className="py-4">
              {megaMenuData.map((cat) => (
                <div key={cat.key}>
                  <button
                    className="w-full flex items-center justify-between px-6 py-3.5 text-sm font-medium text-charcoal hover:text-gold transition-colors tracking-wide"
                    onClick={() =>
                      setMobileCategory(mobileCategory === cat.key ? null : cat.key)
                    }
                  >
                    <span>{t(cat.key)}</span>
                    <ChevronDown
                      size={14}
                      className={`transition-transform ${mobileCategory === cat.key ? 'rotate-180 text-gold' : ''}`}
                    />
                  </button>
                  {mobileCategory === cat.key && (
                    <div className="bg-cream px-6 py-2">
                      {cat.subs.map((sub) => (
                        <Link
                          key={sub.key}
                          href={`/category/${cat.slug}/${sub.slug}`}
                          className="block py-2.5 text-sm text-warm-gray hover:text-gold transition-colors"
                          onClick={() => setMenuOpen(false)}
                        >
                          {t(sub.key)}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Mobile User Links */}
            <div className="border-t border-border px-6 py-4 space-y-1">
              {isAuthenticated ? (
                <>
                  <Link href="/profile" className="flex items-center gap-3 py-3 text-sm text-charcoal hover:text-gold transition-colors" onClick={() => setMenuOpen(false)}>
                    <User size={16} /> {t('myProfile')}
                  </Link>
                  <Link href="/favorites" className="flex items-center gap-3 py-3 text-sm text-charcoal hover:text-gold transition-colors" onClick={() => setMenuOpen(false)}>
                    <Heart size={16} /> {t('favorites')}
                  </Link>
                  <button
                    className="flex items-center gap-3 py-3 text-sm text-warm-gray hover:text-destructive transition-colors"
                    onClick={() => { logout(); setMenuOpen(false) }}
                  >
                    <LogOut size={16} /> {t('logout')}
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="block py-3 text-sm text-charcoal hover:text-gold transition-colors" onClick={() => setMenuOpen(false)}>
                    {t('login')}
                  </Link>
                  <Link href="/register" className="block py-3 text-sm text-charcoal hover:text-gold transition-colors" onClick={() => setMenuOpen(false)}>
                    {t('register')}
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
