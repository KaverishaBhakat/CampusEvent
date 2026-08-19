import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()

  const currentSearch = location.pathname === '/events' ? searchParams.get('search') || '' : ''
  const [searchTerm, setSearchTerm] = useState(currentSearch)

  useEffect(() => {
    if (location.pathname === '/events') {
      setSearchTerm(searchParams.get('search') || '')
    } else {
      setSearchTerm('')
    }
  }, [location.pathname, searchParams])

  const closeMenu = () => setMenuOpen(false)

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault()
    closeMenu()
    const trimmed = searchTerm.trim()
    if (trimmed) {
      navigate(`/events?search=${encodeURIComponent(trimmed)}`)
    } else if (location.pathname === '/events') {
      navigate('/events')
    }
  }

  const handleClear = () => {
    setSearchTerm('')
    if (location.pathname === '/events' && searchParams.has('search')) {
      navigate('/events')
    }
  }

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <span className="navbar-logo-mark">CE</span>
          <span>CampusEvent</span>
        </Link>

        <form className="navbar-search" onSubmit={handleSearchSubmit} role="search">
          <span className="navbar-search-icon" aria-hidden="true">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
          <input
            id="navbar-search-input"
            type="text"
            className="navbar-search-input"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search"
            autoComplete="off"
          />
          {searchTerm && (
            <button
              type="button"
              className="navbar-search-clear"
              onClick={handleClear}
              title="Clear search"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </form>

        <nav className={`navbar-links ${menuOpen ? 'is-open' : ''}`}>
          <NavLink to="/" end onClick={closeMenu}>
            Home
          </NavLink>
          <NavLink to="/events" onClick={closeMenu}>
            Events
          </NavLink>
          <NavLink to="/about" onClick={closeMenu}>
            About
          </NavLink>
          <Link to="/create-event" className="btn btn-primary btn-sm navbar-cta" onClick={closeMenu}>
            Create Event
          </Link>
        </nav>

        <button
          className="navbar-toggle"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}

export default Navbar
