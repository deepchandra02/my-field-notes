import { Link } from 'react-router-dom'
import Layout from '../components/Layout'

export default function NotFound() {
  return (
    <Layout>
      <div className="py-24 text-center">
        <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-4">
          404
        </div>
        <h1 className="text-4xl tracking-wide mb-4">Not found</h1>
        <p className="text-muted-foreground mb-8">
          This page hasn't been written yet — or it was retired.
        </p>
        <Link
          to="/"
          className="font-mono text-xs uppercase tracking-wider hover:text-accent transition-colors underline"
        >
          ← Home
        </Link>
      </div>
    </Layout>
  )
}
