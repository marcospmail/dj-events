import Link from 'next/link'
import Image from 'next/image'
import { FaPencilAlt, FapencilAlt, FaTimes } from 'react-icons/fa'

import Layout from '@/components/Layout'
import styles from '@/styles/Event.module.css'

import { API_URL } from '@/config/index'

export default function EventPage({ event }) {
  function deleteEvent(event) {
    console.log('delete')
  }

  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${event.id}`} >
            <a ><FaPencilAlt /> Edit event</a>
          </Link>
          <a href="#" className={styles.delete} onClick={deleteEvent}>
            <FaTimes /> Delete Event
          </a>
        </div>

        <span>
          {event.date} at {event.tmie}
        </span>

        <h1>{event.name}</h1>

        {event.image && (
          <div className={styles.image}>
            <Image src={event.image} width={960} height={600} />
          </div>
        )}

        <h3>Performers:</h3>
        <p>{event.performers}</p>

        <h3>Description:</h3>
        <p>{event.description}</p>

        <h3>Venue:</h3>
        <p>{event.adress}</p>

        <Link href="/events"><a className={styles.back}>Back</a></Link>

      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/api/events`)
  const events = await res.json()

  const paths = events.map(v => ({
    params: {
      slug: v.slug
    }
  }))

  return { paths, fallback: true }
}

export async function getStaticProps(context) {
  const slug = context.params.slug

  const res = await fetch(`${API_URL}/api/events/${slug}`)
  const events = await res.json()

  return {
    props: {
      event: events[0]
    },
    revalidate: 1
  }
}
