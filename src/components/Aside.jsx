export default function Aside({ children }) {
  return (
    <aside className="aside-note my-6 lg:my-0 border-l-2 border-accent bg-accent/10 px-4 py-3 lg:border-l-2 lg:bg-transparent lg:px-0 lg:py-0">
      <div className="text-xs tracking-wider uppercase text-muted-foreground font-mono mb-2 lg:px-3">
        Aside
      </div>
      <div className="text-sm leading-relaxed text-foreground/90 font-serif lg:px-3">
        {children}
      </div>
    </aside>
  )
}
