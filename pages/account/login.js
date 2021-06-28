import { useState, useEffect } from "react"
import { FaUser } from 'react-icons/fa'
import Link from 'next/link'
import { ToastContainer, toast } from "react-toastify"

import { useAuth } from '@/hooks/auth'
import Layout from '@/components/Layout'
import styles from '@/styles/AuthForm.module.css'

export default function LoginPage() {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const { login, error } = useAuth()

  useEffect(() => {
    error && toast.error(error)  
  }, [error])
  
  const handleSubmit = (e) => {
    e.preventDefault()

    login({ email, password })
  }

  return (
    <Layout title='User Login'>
      <div className={styles.auth}>
        <h1>
          <FaUser /> Login
        </h1>

        <form onSubmit={handleSubmit} >
          <div>
            <label htmlFor="email" >Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <input type="submit" value="Login" className="btn" />
        </form>

        <p>Don't have an account? <Link href='/account/register'>Register</Link>
        </p>

      </div>
    </Layout>
  )
}
