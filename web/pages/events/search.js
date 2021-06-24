import Link from 'next/link'
import { useRouter } from 'next/router'
import qs from 'qs'


import Layout from '@/components/Layout'
import EventItem from '@/components/EventItem'

import { API_URL } from '@/config/index'

export default function HomePage({ events }) {
  const router = useRouter()

  return (
    <Layout>
      <h1>Searched for: {router.query.term}</h1>

      {events.length === 0 &&
        <h3>No events to show</h3>
      }

      {events.map(evt => (
        <EventItem key={evt.id} event={evt} />
      ))}

      {events.length > 0 && (
        <Link href={`/events`}>
          <a className="btn-secondary">View all events</a>
        </Link>
      )}

    </Layout>
  )
}

export async function getServerSideProps(context) {
  const { term } = context.query

  const query = qs.stringify({
    _where: {
      _or: [
        { name_contains: term },
        { performers_contains: term },
        { description_contains: term },
        { venue_contains: term },
      ]
    }
  })

  const res = await fetch(`${API_URL}/events?${query}`)
  const events = await res.json()

  return {
    props: { events },
  }
}
