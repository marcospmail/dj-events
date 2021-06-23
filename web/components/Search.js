import { useState } from 'react'
import { useRouter } from "next/router"

import styles from '@/styles/Search.module.css'

export default function Search() {
  const router = useRouter()

  const [searchTerm, setSearchTerm] = useState()

  function handleOnSubmit(e) {
    e.preventDefault()

    router.push(`/events/search?term=${searchTerm}`)
    setSearchTerm('')
  }

  return (
    <div className={styles.search}>
      <form onSubmit={handleOnSubmit}>
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search events"
        />

      </form>
    </div>
  )
}
