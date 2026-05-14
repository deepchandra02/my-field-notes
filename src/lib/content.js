const modules = import.meta.glob('../content/**/*.mdx', { eager: true })
const rawSources = import.meta.glob('../content/**/*.mdx', {
  eager: true,
  query: '?raw',
  import: 'default',
})

function deriveSlug(path) {
  const file = path.split('/').pop().replace(/\.mdx$/, '')
  return file.replace(/^\d{4}-\d{2}-\d{2}-/, '')
}

function deriveType(path) {
  if (path.includes('/content/notes/')) return 'note'
  return 'essay'
}

const allPosts = Object.entries(modules)
  .map(([path, mod]) => {
    const frontmatter = mod.frontmatter || {}
    const slug = frontmatter.slug || deriveSlug(path)
    const type = frontmatter.type || deriveType(path)
    const raw = rawSources[path] || ''
    return {
      slug,
      path,
      type,
      Component: mod.default,
      raw,
      frontmatter: {
        title: 'Untitled',
        date: null,
        tags: [],
        description: '',
        draft: false,
        ...frontmatter,
        type,
      },
    }
  })
  .filter((p) => !(p.frontmatter.draft && import.meta.env.PROD))
  .sort((a, b) => {
    const da = new Date(a.frontmatter.date || 0).getTime()
    const db = new Date(b.frontmatter.date || 0).getTime()
    return db - da
  })

export function getAllPosts() {
  return allPosts
}

export function getEssays() {
  return allPosts.filter((p) => p.type === 'essay')
}

export function getNotes() {
  return allPosts.filter((p) => p.type === 'note')
}

export function getPostBySlug(slug) {
  return allPosts.find((p) => p.slug === slug) || null
}

export function getAdjacentPosts(slug) {
  const idx = allPosts.findIndex((p) => p.slug === slug)
  if (idx === -1) return { prev: null, next: null }
  return {
    prev: allPosts[idx + 1] || null,
    next: allPosts[idx - 1] || null,
  }
}

export function getAllTags() {
  const counts = new Map()
  for (const post of allPosts) {
    for (const tag of post.frontmatter.tags || []) {
      counts.set(tag, (counts.get(tag) || 0) + 1)
    }
  }
  return Array.from(counts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag))
}

export function getPostsByTag(tag) {
  return allPosts.filter((p) => (p.frontmatter.tags || []).includes(tag))
}
