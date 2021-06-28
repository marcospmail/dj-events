import Link from 'next/link'

import { EVENTS_PER_PAGE } from '@/config/index'

export default function Pagination({ totalCount, page }) {
  const totalPages = Math.ceil(totalCount / EVENTS_PER_PAGE)

  return (
    <>
      {page > 1 && (
        <Link href={`/events?page=${page - 1}`}>
          <a className="btn-secondary">Previous</a>
        </Link>
      )
      }

      {
        page < totalPages && (
          <Link href={`/events?page=${page + 1}`}>
            <a className="btn-secondary">Next</a>
          </Link>
        )
      }
    </>
  )
}
