import Link from 'next/link'
import { FaSignInAlt } from 'react-icons/fa'
import { useAuth } from '@/hooks/auth'

import Search from '@/components/Search'

import styles from '@/styles/Header.module.css'

export default function Header() {
  const { user, error, logout } = useAuth()

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href='/'>
          <a>DJ Events</a>
        </Link>
      </div>

      <Search />

      <nav>
        <ul>
          <li>
            <Link href='/events'>
              <a>Events</a>
            </Link>
          </li>

          {user ? (
            <>
              <li>
                <Link href='/events/add'>
                  <a>Add event</a>
                </Link>
              </li>

              <li>
                <Link href='/account/dashboard'>
                  <a>Dashboard</a>
                </Link>
              </li>

              <li>
                <button className="btn-secondary" onClick={logout}>Logout</button>
              </li>
            </>
          ) : (
            <li>
              <Link href='/account/login'>
                <a className="btn-secondary btn-icon"><FaSignInAlt />Login</a>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  )
}
