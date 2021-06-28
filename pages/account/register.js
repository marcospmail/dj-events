import { useState } from "react"
import { FaUser } from 'react-icons/fa'
import Link from 'next/link'
import { toast } from "react-toastify"

import { useAuth } from '@/hooks/auth'

import Layout from '@/components/Layout'
import styles from '@/styles/AuthForm.module.css'

export default function LoginPage() {
  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [passwordConfirmation, setPasswordConfirmation] = useState()

  const { register } = useAuth()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (password !== passwordConfirmation) {
      toast.error('Password dont match')
      return
    }

    register({ username, email, password })
  }

  return (
    <Layout title='User Registration'>

      <div className={styles.auth}>
        <h1>
          <FaUser /> Register
        </h1>

        <form onSubmit={handleSubmit} >

          <div>
            <label htmlFor="username" >Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>

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
          <div>
            <label htmlFor="passwordConfirmation">Password Confirmation</label>
            <input
              id="passwordConfirmation"
              type="password"
              value={passwordConfirmation}
              onChange={e => setPasswordConfirmation(e.target.value)}
            />
          </div>

          <input type="submit" value="Register" className="btn" />
        </form>

        <p>Don't have an account? <Link href='/account/register'>Register</Link>
        </p>

      </div>
    </Layout>
  )
}
