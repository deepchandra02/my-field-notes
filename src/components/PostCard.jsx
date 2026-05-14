import { Link } from 'react-router-dom'
import { formatDate } from '../lib/utils'
import TagBadge from './TagBadge'

export default function PostCard({ post }) {
  const { slug, frontmatter, type } = post
  return (
    <article className="group border-b border-border pb-8 mb-8 last:border-b-0">
      <Link to={`/post/${slug}`} className="block">
        <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">
          <span>{formatDate(frontmatter.date)}</span>
          <span aria-hidden>·</span>
          <span className="text-accent">{type}</span>
        </div>
        <h2 className="text-2xl tracking-wide mb-2 group-hover:text-accent transition-colors">
          {frontmatter.title}
        </h2>
        {frontmatter.description && (
          <p className="text-muted-foreground text-[15px] leading-relaxed mb-3">
            {frontmatter.description}
          </p>
        )}
      </Link>
      {frontmatter.tags && frontmatter.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {frontmatter.tags.map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
      )}
    </article>
  )
}
