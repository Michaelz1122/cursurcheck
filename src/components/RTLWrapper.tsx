'use client'

import { ReactNode } from 'react'

interface RTLWrapperProps {
  children: ReactNode
  className?: string
}

export default function RTLWrapper({ children, className = '' }: RTLWrapperProps) {
  return (
    <div 
      className={`${className} rtl`}
      style={{
        direction: 'rtl',
        textAlign: 'right',
        fontFamily: "'Noto Sans Arabic', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        lineHeight: '1.8',
        letterSpacing: '0.02em'
      }}
    >
      {children}
    </div>
  )
}