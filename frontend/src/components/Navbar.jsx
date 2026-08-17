import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <span className="navbar-logo-mark">CE</span>
          <span>CampusEvent</span>
        </Link>

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
