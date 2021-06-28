import { useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { toast, ToastContainer } from "react-toastify"

import { useAuth } from '@/hooks/auth'

import Header from './Header'
import Footer from './Footer'
import Showcase from './Showcase'

import styles from '@/styles/Layout.module.css'

export default function Layout({ title, keywords, description, children }) {
  const { error } = useAuth()

  const router = useRouter()

  useEffect(() => {
    error && toast.error(error)
  }, [error])


  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
      </Head>

      <Header />

      {router.pathname === '/' && <Showcase />}

      <div className={styles.container}>{children}</div>
      <Footer />
      <ToastContainer />
    </div>
  )
}

Layout.defaultProps = {
  title: 'DJ Events | Find the hottest parties',
  description: 'Find the latest DJ and other musical events',
  keywords: 'music, dj, edm, events',
}
