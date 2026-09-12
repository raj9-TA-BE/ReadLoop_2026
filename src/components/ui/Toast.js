'use client'
import { useEffect, useState } from 'react'
import styles from './Toast.module.css'

export function ToastContainer({ toasts }) {
  return (
    <div className={styles.container}>
      {toasts.map(t => (
        <div key={t.id} className={`${styles.toast} ${styles[t.type]}`}>
          {t.msg}
        </div>
      ))}
    </div>
  )
}
