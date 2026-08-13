'use client'

import { useEffect, useState } from 'react'

interface DraftModeBannerProps {
  isDraftMode: boolean
}

export function DraftModeBanner({
  isDraftMode,
}: DraftModeBannerProps) {
  const [isEmbedded, setIsEmbedded] = useState(false)

  useEffect(() => {
    setIsEmbedded(window.self !== window.top)
  }, [])

  if (!isDraftMode || isEmbedded) {
    return null
  }

  return (
    <div className="sticky top-0 z-50 bg-yellow-500 py-2 text-center text-sm font-medium text-black">
      Draft Mode — viewing unpublished changes.{' '}
      <a href="/api/preview/exit" className="underline">
        Exit preview
      </a>
    </div>
  )
}