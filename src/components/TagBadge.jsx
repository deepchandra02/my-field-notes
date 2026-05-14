import { Link } from 'react-router-dom'
import { cn } from '../lib/utils'

export default function TagBadge({ tag, count, className }) {
  return (
    <Link
      to={`/tags/${encodeURIComponent(tag)}`}
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono uppercase tracking-wider border border-border rounded text-muted-foreground hover:text-foreground hover:border-accent transition-colors',
        className,
      )}
    >
      <span>#{tag}</span>
      {typeof count === 'number' && (
        <span className="text-[10px] opacity-70">({count})</span>
      )}
    </Link>
  )
}
