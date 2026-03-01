'use client'

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import type { Product } from '@/lib/products'
import { translations as i18nTranslations } from '@/lib/i18n'

/* ─────────────────────────────────────────────
   LANGUAGE CONTEXT
───────────────────────────────────────────── */
type Lang = 'az' | 'en' | 'ru'
type TranslationKey = keyof typeof i18nTranslations.az

interface LangContextType {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: string) => string
}

const LangContext = createContext<LangContextType>({
  lang: 'az',
  setLang: () => {},
  t: (k) => k,
})

export function useLang() {
  return useContext(LangContext)
}

/* ─────────────────────────────────────────────
   CART CONTEXT
───────────────────────────────────────────── */
interface CartItem {
  product: Product
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addItem: (product: Product, qty?: number) => void
  removeItem: (id: string) => void
  updateQty: (id: string, qty: number) => void
  clearCart: () => void
  totalItems: number
  subtotal: number
  isOpen: boolean
  setIsOpen: (v: boolean) => void
}

const CartContext = createContext<CartContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  updateQty: () => {},
  clearCart: () => {},
  totalItems: 0,
  subtotal: 0,
  isOpen: false,
  setIsOpen: () => {},
})

export function useCart() {
  return useContext(CartContext)
}

/* ─────────────────────────────────────────────
   FAVORITES CONTEXT
───────────────────────────────────────────── */
interface FavoritesContextType {
  favorites: Product[]
  toggleFavorite: (product: Product) => void
  isFavorite: (id: string) => boolean
}

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  toggleFavorite: () => {},
  isFavorite: () => false,
})

export function useFavorites() {
  return useContext(FavoritesContext)
}

/* ─────────────────────────────────────────────
   AUTH CONTEXT
───────────────────────────────────────────── */
export interface AuthUser {
  firstName: string
  lastName: string
  email: string
  phone: string
  address?: string
  city?: string
  country?: string
}

export interface Order {
  id: string
  date: string
  status: string
  total: number
  items: { product: Product; quantity: number }[]
}

interface RegisterPayload {
  firstName: string
  lastName: string
  email: string
  phone: string
  city?: string
  country?: string
  password: string
  confirmPassword?: string
}

interface AuthContextType {
  user: AuthUser | null
  orders: Order[]
  login: (email: string, password: string) => boolean
  register: (payload: RegisterPayload) => boolean
  logout: () => void
  updateProfile: (updates: Partial<AuthUser>) => void
  addOrder: (items: { product: Product; quantity: number }[], total: number) => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  orders: [],
  login: () => false,
  register: () => false,
  logout: () => {},
  updateProfile: () => {},
  addOrder: () => {},
})

export function useAuth() {
  return useContext(AuthContext)
}

/* ─────────────────────────────────────────────
   PROVIDERS WRAPPER
───────────────────────────────────────────── */
export function GlamoraProviders({ children }: { children: ReactNode }) {
  // Language
  const [lang, setLangState] = useState<Lang>('az')
  const t = useCallback((key: string): string => {
    return (i18nTranslations[lang] as Record<string, string>)[key] ?? key
  }, [lang])
  const setLang = (l: Lang) => {
    setLangState(l)
    if (typeof window !== 'undefined') localStorage.setItem('glamora_lang', l)
  }

  // Cart
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)

  const addItem = useCallback((product: Product, qty = 1) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.product.id === product.id)
      if (existing) {
        return prev.map(i => i.product.id === product.id
          ? { ...i, quantity: Math.min(i.quantity + qty, product.stockCount) }
          : i)
      }
      return [...prev, { product, quantity: qty }]
    })
  }, [])

  const removeItem = useCallback((id: string) => {
    setCartItems(prev => prev.filter(i => i.product.id !== id))
  }, [])

  const updateQty = useCallback((id: string, qty: number) => {
    if (qty < 1) { removeItem(id); return }
    setCartItems(prev => prev.map(i => i.product.id === id ? { ...i, quantity: qty } : i))
  }, [removeItem])

  const clearCart = useCallback(() => setCartItems([]), [])

  const totalItems = cartItems.reduce((s, i) => s + i.quantity, 0)
  const subtotal = cartItems.reduce((s, i) => s + i.product.price * i.quantity, 0)

  // Favorites
  const [favorites, setFavorites] = useState<Product[]>([])

  const toggleFavorite = useCallback((product: Product) => {
    setFavorites(prev => {
      const exists = prev.some(p => p.id === product.id)
      const next = exists ? prev.filter(p => p.id !== product.id) : [...prev, product]
      if (typeof window !== 'undefined') localStorage.setItem('glamora_favorites', JSON.stringify(next))
      return next
    })
  }, [])

  const isFavorite = useCallback((id: string) => favorites.some(p => p.id === id), [favorites])

  // Auth
  const [user, setUser] = useState<AuthUser | null>(null)
  const [orders, setOrders] = useState<Order[]>([])

  const login = useCallback((email: string, _password: string): boolean => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('glamora_user') : null
    if (stored) {
      const u = JSON.parse(stored) as AuthUser & { password: string }
      if (u.email === email) {
        const { password: _pw, ...rest } = u as any
        setUser(rest as AuthUser)
        const savedOrders = localStorage.getItem('glamora_orders')
        if (savedOrders) { try { setOrders(JSON.parse(savedOrders)) } catch { /* ignore */ } }
        return true
      }
    }
    return false
  }, [])

  const register = useCallback((payload: { firstName: string; lastName: string; email: string; phone: string; city?: string; country?: string; password: string }): boolean => {
    if (typeof window !== 'undefined') {
      const existing = localStorage.getItem('glamora_user')
      if (existing) {
        try {
          const u = JSON.parse(existing)
          if (u.email === payload.email) return false
        } catch { /* ignore */ }
      }
      const { password, ...userData } = payload
      localStorage.setItem('glamora_user', JSON.stringify({ ...userData, password }))
      setUser(userData as AuthUser)
      return true
    }
    return false
  }, [])

  const logout = useCallback(() => { setUser(null); setOrders([]) }, [])

  const updateProfile = useCallback((updates: Partial<AuthUser>) => {
    setUser(prev => {
      if (!prev) return prev
      const updated = { ...prev, ...updates }
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('glamora_user')
        if (stored) {
          try {
            const full = JSON.parse(stored)
            localStorage.setItem('glamora_user', JSON.stringify({ ...full, ...updates }))
          } catch { /* ignore */ }
        }
      }
      return updated
    })
  }, [])

  const addOrder = useCallback((items: { product: Product; quantity: number }[], total: number) => {
    const newOrder: Order = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      status: 'Processing',
      total,
      items,
    }
    setOrders(prev => {
      const next = [newOrder, ...prev]
      if (typeof window !== 'undefined') localStorage.setItem('glamora_orders', JSON.stringify(next))
      return next
    })
  }, [])

  // Hydrate from localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return
    const savedLang = localStorage.getItem('glamora_lang') as Lang | null
    if (savedLang) setLangState(savedLang)

    const savedFav = localStorage.getItem('glamora_favorites')
    if (savedFav) {
      try { setFavorites(JSON.parse(savedFav)) } catch { /* ignore */ }
    }

    const savedUser = localStorage.getItem('glamora_user')
    if (savedUser) {
      try {
        const { password: _pw, ...rest } = JSON.parse(savedUser)
        setUser(rest as AuthUser)
        const savedOrders = localStorage.getItem('glamora_orders')
        if (savedOrders) { try { setOrders(JSON.parse(savedOrders)) } catch { /* ignore */ } }
      } catch { /* ignore */ }
    }
  }, [])

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      <CartContext.Provider value={{ items: cartItems, addItem, removeItem, updateQty, clearCart, totalItems, subtotal, isOpen: cartOpen, setIsOpen: setCartOpen }}>
        <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
          <AuthContext.Provider value={{ user, orders, login, register, logout, updateProfile, addOrder }}>
            {children}
          </AuthContext.Provider>
        </FavoritesContext.Provider>
      </CartContext.Provider>
    </LangContext.Provider>
  )
}
