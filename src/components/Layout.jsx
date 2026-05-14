import { Link, NavLink } from 'react-router-dom'
import { cn } from '../lib/utils'
import DarkModeToggle from './DarkModeToggle'

const navLinkClass = ({ isActive }) =>
  cn(
    'transition-colors',
    isActive ? 'text-accent' : 'text-foreground hover:text-accent',
  )

export default function Layout({ children, className, maxWidth = 'max-w-3xl' }) {
  return (
    <div className="min-h-screen bg-background">
      <nav className="w-full border-b border-border font-mono">
        <div className={cn(maxWidth, 'mx-auto px-8 py-6')}>
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="text-foreground hover:text-accent transition-colors text-sm tracking-wide"
            >
              FIELD NOTES
            </Link>
            <div className="flex gap-8 items-center text-sm">
              <NavLink to="/archive" className={navLinkClass} end>
                Archive
              </NavLink>
              <NavLink to="/tags" className={navLinkClass}>
                Tags
              </NavLink>
              <NavLink to="/about" className={navLinkClass} end>
                About
              </NavLink>
              <DarkModeToggle />
            </div>
          </div>
        </div>
      </nav>

      <main className={cn(maxWidth, 'mx-auto px-8 py-16', className)}>
        {children}
      </main>

      <footer className="border-t border-border font-mono">
        <div className={cn(maxWidth, 'mx-auto px-8 py-6 text-xs text-muted-foreground flex justify-between')}>
          <span>© {new Date().getFullYear()} Field Notes</span>
          <Link to="/" className="hover:text-accent transition-colors">
            ↑ TOP
          </Link>
        </div>
      </footer>
    </div>
  )
}
