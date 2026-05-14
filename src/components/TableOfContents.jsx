import { useEffect, useState } from 'react'
import { cn } from '../lib/utils'

export default function TableOfContents({ containerId = 'post-content' }) {
  const [headings, setHeadings] = useState([])
  const [activeId, setActiveId] = useState(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const container = document.getElementById(containerId)
    if (!container) return

    const nodes = Array.from(container.querySelectorAll('h2[id], h3[id]'))
    setHeadings(
      nodes.map((node) => ({
        id: node.id,
        text: node.textContent || '',
        level: node.tagName === 'H3' ? 3 : 2,
      })),
    )

    if (nodes.length === 0) return

    const visible = new Map()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry.intersectionRatio)
          } else {
            visible.delete(entry.target.id)
          }
        }
        if (visible.size > 0) {
          const top = Array.from(visible.entries()).sort((a, b) => b[1] - a[1])[0]
          setActiveId(top[0])
        }
      },
      { rootMargin: '-15% 0px -70% 0px', threshold: [0, 0.25, 0.5, 1] },
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [containerId])

  if (headings.length === 0) return null

  return (
    <>
      <div className="lg:hidden mb-8 border border-border rounded">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="w-full px-4 py-3 text-xs font-mono uppercase tracking-wider text-muted-foreground flex items-center justify-between"
        >
          <span>Contents</span>
          <span>{open ? '−' : '+'}</span>
        </button>
        {open && <TocList headings={headings} activeId={activeId} />}
      </div>

      <nav className="hidden lg:block lg:sticky lg:top-24">
        <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground border-b border-border pb-2 mb-4">
          Contents
        </div>
        <TocList headings={headings} activeId={activeId} />
      </nav>
    </>
  )
}

function TocList({ headings, activeId }) {
  return (
    <ul className="font-mono text-xs space-y-2 px-4 py-3 lg:p-0">
      {headings.map((h) => (
        <li key={h.id} className={cn(h.level === 3 && 'pl-4')}>
          <a
            href={`#${h.id}`}
            className={cn(
              'transition-colors leading-relaxed block',
              activeId === h.id
                ? 'text-accent'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {h.text}
          </a>
        </li>
      ))}
    </ul>
  )
}
