'use client'

import { ReactNode } from 'react'

interface RTLWrapperProps {
  children: ReactNode
  className?: string
  language?: 'ar' | 'en'
}

export default function RTLWrapper({ children, className = '', language = 'ar' }: RTLWrapperProps) {
  const isRTL = language === 'ar'
  
  return (
    <div 
      className={`${className} ${isRTL ? 'rtl' : 'ltr'}`}
      style={{
        direction: isRTL ? 'rtl' : 'ltr',
        textAlign: isRTL ? 'right' : 'left',
        fontFamily: isRTL 
          ? "'Noto Sans Arabic', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" 
          : "'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif",
        lineHeight: '1.8',
        letterSpacing: isRTL ? '0.02em' : '0.01em',
        fontSynthesis: 'none',
        fontVariantLigatures: 'common-ligatures',
        textRendering: 'optimizeLegibility',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale'
      }}
    >
      {children}
    </div>
  )
}