"use client"

import { useEffect, useState } from 'react'

interface Props {
  children: React.ReactNode
  durationMs?: number
}

export default function FadeInOnMount({ children, durationMs = 250 }: Props) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) {
      // Respect reduced motion: show immediately
      setReady(true)
      return
    }
    const t = setTimeout(() => setReady(true), 10)
    return () => clearTimeout(t)
  }, [])

  return (
    <div
      style={{ transition: `opacity ${durationMs}ms ease-out, transform ${durationMs}ms ease-out` }}
      className={ready ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}
    >
      {children}
    </div>
  )
}

