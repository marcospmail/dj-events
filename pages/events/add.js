import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { toast } from 'react-toastify'

import { useAuth } from '@/hooks/auth'

import Layout from '@/components/Layout'

import styles from '@/styles/Form.module.css'

import { API_URL } from '@/config/index'

import { parseCookies } from '@/helpers/index'

export default function AddNewEvent({ token }) {
  const [values, setValues] = useState({
    name: '',
    performers: '',
    venue: '',
    address: '',
    date: '',
    time: '',
    description: ''
  })

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const hasEmptyValue = Object.values(values).some(v => !v || v === '')

    if (hasEmptyValue) {
      toast.error('Please fill in all fields')
    }

    const res = await fetch(`${API_URL}/events`, {
      method: 'POST',
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
    }
    else {
      router.push(`/events/${data.slug}`)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target

    setValues(oldValues => ({ ...oldValues, [name]: value }))
  }

  return (
    <Layout title="Add new event" >
      <Link href="/events">GoBack</Link>

      <h1>Add event</h1>

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
              value={values.date}
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

        <input type='submit' value='Add Event' className='btn' />
      </form>

    </Layout >
  )
}

export async function getServerSideProps(context) {
  const { token } = parseCookies(context.req)

  return {
    props: {
      token: token || null
    }
  }
}
