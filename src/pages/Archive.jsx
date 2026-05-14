import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import { getAllPosts } from '../lib/content'
import { formatDate } from '../lib/utils'

export default function Archive() {
  const posts = getAllPosts()

  const groups = posts.reduce((acc, post) => {
    const year = post.frontmatter.date
      ? new Date(post.frontmatter.date).getFullYear()
      : 'Undated'
    if (!acc[year]) acc[year] = []
    acc[year].push(post)
    return acc
  }, {})

  const years = Object.keys(groups).sort((a, b) => Number(b) - Number(a))

  return (
    <Layout>
      <header className="mb-16">
        <h1 className="text-4xl tracking-wide mb-4">Archive</h1>
        <p className="text-muted-foreground text-[15px] leading-relaxed">
          {posts.length} {posts.length === 1 ? 'entry' : 'entries'}.
        </p>
      </header>

      {years.map((year) => (
        <section key={year} className="mb-12">
          <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground border-b border-border pb-2 mb-4">
            {year}
          </h2>
          <ul className="space-y-3">
            {groups[year].map((post) => (
              <li key={post.slug} className="flex items-baseline gap-4">
                <span className="font-mono text-xs text-muted-foreground w-28 shrink-0">
                  {formatDate(post.frontmatter.date)}
                </span>
                <Link
                  to={`/post/${post.slug}`}
                  className="text-foreground hover:text-accent transition-colors text-[15px] leading-relaxed"
                >
                  {post.frontmatter.title}
                </Link>
                <span className="font-mono text-[10px] uppercase tracking-wider text-accent ml-auto shrink-0">
                  {post.type}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </Layout>
  )
}
