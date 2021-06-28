import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { toast } from 'react-toastify'
import moment from 'moment'
import { FaImage } from 'react-icons/fa'

import Layout from '@/components/Layout'
import Modal from '@/components/Modal'
import ImageUpload from '@/components/ImageUpload'

import styles from '@/styles/Form.module.css'

import { API_URL } from '@/config/index'
import { parseCookies } from '@/helpers/index'

export default function AddNewEvent({ event, token }) {
  const [values, setValues] = useState(event)
  const [showModal, setShowModal] = useState(false)

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const res = await fetch(`${API_URL}/events/${event.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(values)
    })

    const data = await res.json()

    if (!res.ok) {
      if ([401, 403].includes(res.status)) {
        data.message = 'No token included'
      }

      toast.error(data.message)

    } else {
      router.push('/account/dashboard')
    }

  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setValues(oldValues => ({ ...oldValues, [name]: value }))
  }

  const handleImageUploaded = async (e) => {
    setShowModal(false)

    const res = await fetch(`${API_URL}/events/${event.id}`)
    const data = await res.json()

    setValues(data)
  }

  return (
    <Layout title="Add new event" >
      <Link href="/events">GoBack</Link>

      <h1>Edit event</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor='name'>Event Name</label>
            <input
              type='text'
              id='name'
              name='name'
              value={values.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='performers'>Performers</label>
            <input
              type='text'
              name='performers'
              id='performers'
              value={values.performers}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='venue'>Venue</label>
            <input
              type='text'
              name='venue'
              id='venue'
              value={values.venue}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='address'>Address</label>
            <input
              type='text'
              name='address'
              id='address'
              value={values.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='date'>Date</label>
            <input
              type='date'
              name='date'
              id='date'
              value={moment(values.date).format('yyyy-MM-DD')}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='time'>Time</label>
            <input
              type='text'
              name='time'
              id='time'
              value={values.time}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor='description'>Event Description</label>
          <textarea
            type='text'
            name='description'
            id='description'
            value={values.description}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <input type='submit' value='Update Event' className='btn' />
      </form>

      {values.image ? (
        <>
          <h2>Event image</h2>
          <img src={values.image.formats.thumbnail.url} />
        </>
      ) : (
        <h2>Event has no image</h2>
      )}

      <div>
        <button className="btn-secondary" onClick={() => setShowModal(true)}>
          <FaImage /> Set Image
        </button>
      </div>

      <Modal show={showModal} onClose={() => setShowModal(false)} >
        <ImageUpload token={token} eventId={event.id} imageUploaded={handleImageUploaded} />
      </Modal>

    </Layout >
  )
}


export async function getServerSideProps(context) {
  const { token } = parseCookies(context.req)

  const { id } = context.query

  const res = await fetch(`${API_URL}/events/${id}`)
  const event = await res.json(0)

  return {
    props: {
      event,
      token
    }
  }
}
