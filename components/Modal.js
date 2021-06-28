import { useState, useEffect } from "react"
import ReactDOM from 'react-dom'
import { FaTimes } from 'react-icons/fa'

import styles from '@/styles/Modal.module.css'

export default function Modal({ title, show, onClose, children }) {
  const [isBrowser, setIsBrowser] = useState(false)

  useEffect(() => setIsBrowser(true), [])

  const handleClick = () => {
    onClose()
  }

  const modalContent = show ? (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <a href="#" onClick={handleClick}>
            <FaTimes />
          </a>
        </div>
        {title && <div>{title}</div>}
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  ) : null

  if (isBrowser) {
    return ReactDOM.createPortal(modalContent, document.getElementById('modal-root'))
  }

  return null
}
