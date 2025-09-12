"use client"

import React from 'react'
import { cn } from '@/lib/utils'

export type SpinnerProps = {
  className?: string
  size?: number
  strokeWidth?: number
  label?: string
}

const Spinner: React.FC<SpinnerProps> = ({ className, size = 20, strokeWidth = 2, label }) => {
  const s = Math.max(12, size)
  const r = (s - strokeWidth) / 2
  const c = 2 * Math.PI * r
  return (
    <span className={cn('inline-flex items-center gap-2', className)} aria-live="polite" aria-busy="true">
      <svg
        className="animate-spin text-gray-600"
        width={s}
        height={s}
        viewBox={`0 0 ${s} ${s}`}
        role="status"
        aria-label={label || 'Loading'}
      >
        <circle
          className="opacity-20"
          cx={s / 2}
          cy={s / 2}
          r={r}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          className="opacity-80"
          cx={s / 2}
          cy={s / 2}
          r={r}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * 0.75}
          fill="none"
        />
      </svg>
      {label ? <span className="text-sm text-gray-600">{label}</span> : null}
    </span>
  )
}

export default Spinner

