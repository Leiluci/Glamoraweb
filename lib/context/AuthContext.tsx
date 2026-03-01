'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  country: string
  orders: Order[]
}

export interface Order {
  id: string
  date: string
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered'
  items: { name: string; qty: number; price: number }[]
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (data: Partial<User> & { password: string }) => Promise<boolean>
  logout: () => void
  updateProfile: (data: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => false,
  register: async () => false,
  logout: () => {},
  updateProfile: () => {},
})

const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-001',
    date: '2024-11-15',
    total: 127.5,
    status: 'delivered',
    items: [
      { name: 'Keratin Serum Pro', qty: 1, price: 89.5 },
      { name: 'Gel Polish Set', qty: 1, price: 38.0 },
    ],
  },
  {
    id: 'ORD-002',
    date: '2024-12-03',
    total: 215.0,
    status: 'shipped',
    items: [
      { name: 'UV LED Lamp Professional', qty: 1, price: 145.0 },
      { name: 'Face Serum Vitamin C', qty: 2, price: 35.0 },
    ],
  },
]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('glamora_user')
      if (saved) setUser(JSON.parse(saved))
    } catch {}
  }, [])

  const saveUser = (u: User) => {
    setUser(u)
    localStorage.setItem('glamora_user', JSON.stringify(u))
  }

  const login = async (email: string, _password: string): Promise<boolean> => {
    // Mock login - in production connect to real auth
    const existing = localStorage.getItem('glamora_accounts')
    if (existing) {
      const accounts: (User & { password: string })[] = JSON.parse(existing)
      const found = accounts.find((a) => a.email === email)
      if (found) {
        const { password: _, ...userWithoutPass } = found
        saveUser({ ...userWithoutPass, orders: MOCK_ORDERS })
        return true
      }
    }
    // Demo account
    if (email === 'demo@glamora.az') {
      const demoUser: User = {
        id: 'demo-001',
        firstName: 'Leyla',
        lastName: 'Əliyeva',
        email: 'demo@glamora.az',
        phone: '+994 50 123 45 67',
        address: 'Nizami küçəsi 12',
        city: 'Bakı',
        country: 'Azərbaycan',
        orders: MOCK_ORDERS,
      }
      saveUser(demoUser)
      return true
    }
    return false
  }

  const register = async (data: Partial<User> & { password: string }): Promise<boolean> => {
    const { password, ...userData } = data
    const newUser: User = {
      id: `user-${Date.now()}`,
      firstName: userData.firstName ?? '',
      lastName: userData.lastName ?? '',
      email: userData.email ?? '',
      phone: userData.phone ?? '',
      address: userData.address ?? '',
      city: userData.city ?? '',
      country: userData.country ?? 'Azərbaycan',
      orders: [],
    }
    // Save to mock accounts
    const existing = localStorage.getItem('glamora_accounts')
    const accounts = existing ? JSON.parse(existing) : []
    accounts.push({ ...newUser, password })
    localStorage.setItem('glamora_accounts', JSON.stringify(accounts))
    saveUser(newUser)
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('glamora_user')
  }

  const updateProfile = (data: Partial<User>) => {
    if (!user) return
    const updated = { ...user, ...data }
    saveUser(updated)
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, register, logout, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
