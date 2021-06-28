import Layout from '@/components/Layout'
import EventItem from '@/components/EventItem'
import Pagination from '@/components/Pagination'

import { API_URL, EVENTS_PER_PAGE } from '@/config/index'

export default function EventsPage({ events, page, totalCount }) {

  return (
    <Layout>
      <h1>Events</h1>

      {events.length === 0 &&
        <h3>No events to show</h3>
      }

      {events.map(evt => (
        <EventItem key={evt.id} event={evt} />
      ))}

      <Pagination page={page} totalCount={totalCount} />

    </Layout>
  )
}

export async function getServerSideProps(context, req) {
  const { page = 1 } = context.query

  const eventsOffset = +page === 1 ? 0 : ((+page - 1) * EVENTS_PER_PAGE)

  const totalRes = await fetch(`${API_URL}/events/count`)
  const totalCount = await totalRes.json()

  const res = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=${EVENTS_PER_PAGE}&_start=${eventsOffset}`)
  const events = await res.json()

  events

  return {
    props: { events, page: +page, totalCount },
  }
}
