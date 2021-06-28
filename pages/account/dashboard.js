import router from 'next/router'

import Layout from '@/components/Layout'
import DashboardEvent from '@/components/DashboardEvent'

import { API_URL } from '@/config/index'

import styles from '@/styles/Dashboard.module.css'

import { parseCookies } from '@/helpers/index'

export default function Dashboard({ events, token }) {

  const handleOnEventDelete = async (eventId) => {
    if (confirm('Delete event?')) {
      const res = await fetch(`${API_URL}/events/${eventId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (!res.ok) {
        toast.error('Something failed')
      }
      else {
        router.reload()
      }
    }
  }

  return (
    <Layout title="User dashboard">
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <h3>My Events</h3>

        {events.map(v => (
          <DashboardEvent event={v} handleDelete={handleOnEventDelete} />
        ))}

      </div>


    </Layout>
  )
}

export async function getServerSideProps(context) {
  const { token } = parseCookies(context.req)

  const res = await fetch(`${API_URL}/events/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const events = await res.json()

  return {
    props: {
      events,
      token
    }
  }
}
