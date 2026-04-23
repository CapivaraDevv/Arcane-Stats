import { useState } from 'react'

export function useImageFallback() {
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set())

  const markImageError = (imageKey: string) => {
    setImageErrors((prev) => {
      const next = new Set(prev)
      next.add(imageKey)
      return next
    })
  }

  return {
    imageErrors,
    markImageError,
  }
}
