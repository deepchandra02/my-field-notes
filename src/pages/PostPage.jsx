import { useEffect } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { MDXProvider } from '@mdx-js/react'
import Layout from '../components/Layout'
import TableOfContents from '../components/TableOfContents'
import TagBadge from '../components/TagBadge'
import { mdxComponents } from '../components/MDXComponents'
import { getPostBySlug, getAdjacentPosts } from '../lib/content'
import { formatDate, readingTime } from '../lib/utils'

export default function PostPage() {
  const { slug } = useParams()
  const post = getPostBySlug(slug)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!post) return <Navigate to="/" replace />

  const { Component, frontmatter, type, raw } = post
  const { prev, next } = getAdjacentPosts(slug)

  return (
    <Layout maxWidth="max-w-5xl">
      <article>
        <header className="mb-12 max-w-3xl">
          <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-wider text-muted-foreground mb-4">
            <span>{formatDate(frontmatter.date)}</span>
            <span aria-hidden>·</span>
            <span className="text-accent">{type}</span>
            <span aria-hidden>·</span>
            <span>{readingTime(raw)}</span>
          </div>
          <h1 className="text-4xl tracking-wide mb-4 leading-tight">
            {frontmatter.title}
          </h1>
          {frontmatter.description && (
            <p className="text-muted-foreground text-[15px] leading-relaxed mb-4">
              {frontmatter.description}
            </p>
          )}
          {frontmatter.tags && frontmatter.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {frontmatter.tags.map((tag) => (
                <TagBadge key={tag} tag={tag} />
              ))}
            </div>
          )}
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-12">
          <div id="post-content" className="prose max-w-none min-w-0">
            <MDXProvider components={mdxComponents}>
              <Component />
            </MDXProvider>
          </div>

          <div className="order-first lg:order-last">
            <TableOfContents containerId="post-content" />
          </div>
        </div>

        <footer className="mt-20 pt-8 border-t border-border max-w-3xl">
          <div className="flex justify-between items-start gap-8 mb-8 font-mono text-xs">
            <div className="flex-1">
              {prev && (
                <Link
                  to={`/post/${prev.slug}`}
                  className="group block text-muted-foreground hover:text-accent transition-colors"
                >
                  <div className="uppercase tracking-wider mb-1">← Previous</div>
                  <div className="text-foreground group-hover:text-accent text-[13px] normal-case font-serif tracking-normal">
                    {prev.frontmatter.title}
                  </div>
                </Link>
              )}
            </div>
            <div className="flex-1 text-right">
              {next && (
                <Link
                  to={`/post/${next.slug}`}
                  className="group block text-muted-foreground hover:text-accent transition-colors"
                >
                  <div className="uppercase tracking-wider mb-1">Next →</div>
                  <div className="text-foreground group-hover:text-accent text-[13px] normal-case font-serif tracking-normal">
                    {next.frontmatter.title}
                  </div>
                </Link>
              )}
            </div>
          </div>
          <Link
            to="/archive"
            className="font-mono text-xs uppercase tracking-wider text-muted-foreground hover:text-accent transition-colors"
          >
            ← Back to archive
          </Link>
        </footer>
      </article>
    </Layout>
  )
}
