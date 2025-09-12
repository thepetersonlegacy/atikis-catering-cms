"use client"

import React from 'react'
import { cn } from '@/lib/utils'

export type ErrorMessageProps = {
  title?: string
  message?: string
  className?: string
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ title = 'Something went wrong', message, className }) => {
  return (
    <div
      role="alert"
      className={cn(
        'rounded-md border border-red-200 bg-red-50 p-3 text-red-800',
        'flex items-start gap-2',
        className
      )}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" className="mt-0.5 text-red-500" aria-hidden>
        <path fill="currentColor" d="M11 7h2v6h-2zm0 8h2v2h-2z"/>
        <path fill="currentColor" d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2V9h2v5z"/>
      </svg>
      <div>
        <div className="font-semibold">{title}</div>
        {message ? <div className="text-sm opacity-90">{message}</div> : null}
      </div>
    </div>
  )
}

export default ErrorMessage

