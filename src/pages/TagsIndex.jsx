import Layout from '../components/Layout'
import TagBadge from '../components/TagBadge'
import { getAllTags } from '../lib/content'

export default function TagsIndex() {
  const tags = getAllTags()
  return (
    <Layout>
      <header className="mb-12">
        <h1 className="text-4xl tracking-wide mb-4">Tags</h1>
        <p className="text-muted-foreground text-[15px] leading-relaxed">
          {tags.length} {tags.length === 1 ? 'tag' : 'tags'} across all entries.
        </p>
      </header>

      {tags.length === 0 ? (
        <p className="text-muted-foreground italic">No tags yet.</p>
      ) : (
        <div className="flex flex-wrap gap-3">
          {tags.map(({ tag, count }) => (
            <TagBadge key={tag} tag={tag} count={count} />
          ))}
        </div>
      )}
    </Layout>
  )
}
