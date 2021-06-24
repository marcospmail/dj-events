import Link from 'next/link'
import Image from 'next/image'
import { FaPencilAlt, FaTimes } from 'react-icons/fa'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify'

import Layout from '@/components/Layout'
import styles from '@/styles/Event.module.css'

import { API_URL } from '@/config/index'

export default function EventPage({ event }) {
  const router = useRouter()

  async function deleteEvent() {
    if (confirm('Delete event?')) {
      const res = await fetch(`${API_URL}/events/${event.id}`, {
        method: 'DELETE'
      })

      if (!res.ok) {
        toast.error('Something failed')
      }
      else {
        router.push('/events')
      }
    }
  }

  if (router.isFallback) {
    return <div>Loading...</div>
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
          {new Date(event.date).toLocaleDateString('pt-br')} at {event.time}
        </span>

        <h1>{event.name}</h1>
        <ToastContainer />

        {event.image && (
          <div className={styles.image}>
            <Image src={event.image.formats.medium.url} width={960} height={600} />
          </div>
        )}

        <h3>Performers:</h3>
        <p>{event.performers}</p>

        <h3>Description:</h3>
        <p>{event.description}</p>

        <h3>Venue:</h3>
        <p>{event.address}</p>

        <Link href="/events"><a className={styles.back}>Back</a></Link>

      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/events`)
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

  const res = await fetch(`${API_URL}/events?slug=${slug}`)
  const events = await res.json()

  return {
    props: {
      event: events[0]
    },
    revalidate: 1
  }
}
