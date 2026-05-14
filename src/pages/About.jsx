import Layout from '../components/Layout'

export default function About() {
  return (
    <Layout>
      <header className="mb-12">
        <h1 className="text-4xl tracking-wide mb-4">About</h1>
      </header>

      <div className="prose max-w-none">
        <p>
          Field Notes is a slow notebook. Long essays when an idea earns the
          space; short notes when an observation is enough.
        </p>

        <p>
          Each entry is authored in MDX — Markdown plus the occasional React
          component for things like margin asides. The design carries the same
          quiet typography as my{' '}
          <a href="#" className="underline">
            dialogues site
          </a>
          : a serif body, a monospace nav, and as little chrome as the page can
          stand.
        </p>

        <h2>Conventions</h2>
        <ul>
          <li>
            <strong>Essays</strong> — long-form, with a table of contents and
            margin asides.
          </li>
          <li>
            <strong>Notes</strong> — short. Sometimes a paragraph, sometimes a
            link with a sentence.
          </li>
          <li>
            <strong>Tags</strong> — light-touch grouping rather than rigid
            taxonomy.
          </li>
        </ul>

        <h2>Colophon</h2>
        <p>
          Built with Vite, React, Tailwind, and MDX. Typeset in New York
          (serif) and Departure Mono.
        </p>
      </div>
    </Layout>
  )
}
