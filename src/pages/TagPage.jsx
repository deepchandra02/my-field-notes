import { Link, useParams } from 'react-router-dom'
import Layout from '../components/Layout'
import PostCard from '../components/PostCard'
import { getPostsByTag } from '../lib/content'

export default function TagPage() {
  const { tag } = useParams()
  const decoded = decodeURIComponent(tag)
  const posts = getPostsByTag(decoded)

  return (
    <Layout>
      <header className="mb-12">
        <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
          Tag
        </div>
        <h1 className="text-4xl tracking-wide mb-4">#{decoded}</h1>
        <p className="text-muted-foreground text-[15px] leading-relaxed">
          {posts.length} {posts.length === 1 ? 'entry' : 'entries'}.{' '}
          <Link
            to="/tags"
            className="hover:text-accent transition-colors underline"
          >
            All tags
          </Link>
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="text-muted-foreground italic">Nothing here yet.</p>
      ) : (
        posts.map((post) => <PostCard key={post.slug} post={post} />)
      )}
    </Layout>
  )
}
