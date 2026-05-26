import { useState, useEffect } from 'react'

const OBSERVER_OPTIONS = { rootMargin: '-10% 0px -60% 0px', threshold: 0 }

export function useScrollSpy(ids) {
  const [activeId, setActiveId] = useState(null)

  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean)

    if (elements.length === 0) return

    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

      if (visible.length > 0) {
        setActiveId(visible[0].target.id)
      }
    }, OBSERVER_OPTIONS)

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids])

  return activeId
}
