import { useState, useEffect, createContext, useContext } from 'react'
import router from 'next/router'

import { BFF_URL } from "@/config/index"
import { toast } from 'react-toastify'

export const AuthContext = createContext()

export default function AuthProvider({ children }) {
  const [user, setUser] = useState()
  const [error, setError] = useState()

  useEffect(() => {
    checkUserLoggedIn()
  }, [])

  const register = async ({ email, username, password }) => {
    const res = await fetch(`${BFF_URL}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        username,
        password
      })
    })

    const data = await res.json()

    if (res.ok) {
      setUser(data.user)
      router.push('/account/dashboard')
    } else {
      setError(data.message)
      setError(undefined)
    }
  }

  const login = async ({ email: identifier, password }) => {
    const res = await fetch(`${BFF_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        identifier,
        password
      })
    })

    const data = await res.json()

    if (res.ok) {
      setUser(data.user)
      router.push('/account/dashboard')
    } else {
      setError(data.message)
      setError(undefined)
    }
  }

  const logout = async () => {
    const res = await fetch(`${BFF_URL}/api/logout`, {
      method: 'POST'
    })

    if (res.ok) {
      setUser(null)
      router.push('/')
    }
    else {
      const data = await res.json()

      setError(data.message)
      setError(undefined)
    }

  }

  const checkUserLoggedIn = async () => {
    const res = await fetch(`${BFF_URL}/api/user`)

    if (res.ok) {
      const data = await res.json()
      setUser(data)

    } else {
      setUser(null)

    }
  }

  return (
    <AuthContext.Provider value={{ register, login, logout, checkUserLoggedIn, user, error }}>
      {children}
    </AuthContext.Provider>
  )
}