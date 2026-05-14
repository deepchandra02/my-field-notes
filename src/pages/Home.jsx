import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import PostCard from '../components/PostCard'
import { getAllPosts } from '../lib/content'

export default function Home() {
  const recent = getAllPosts().slice(0, 8)

  return (
    <Layout>
      <header className="mb-16">
        <h1 className="text-4xl tracking-wide mb-4">Field Notes</h1>
        <p className="text-muted-foreground text-[15px] leading-relaxed max-w-xl">
          A working notebook — long essays when the thinking deserves it,
          short notes when an observation is enough.
        </p>
      </header>

      <section>
        <div className="flex items-baseline justify-between mb-6 border-b border-border pb-3">
          <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
            Recent
          </h2>
          <Link
            to="/archive"
            className="text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-accent transition-colors"
          >
            Archive →
          </Link>
        </div>

        {recent.length === 0 ? (
          <p className="text-muted-foreground italic">No posts yet.</p>
        ) : (
          recent.map((post) => <PostCard key={post.slug} post={post} />)
        )}
      </section>
    </Layout>
  )
}
