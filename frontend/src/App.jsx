import { Routes, Route, Link } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Events from './pages/Events.jsx'
import EventDetails from './pages/EventDetails.jsx'
import CreateEvent from './pages/CreateEvent.jsx'
import EditEvent from './pages/EditEvent.jsx'
import About from './pages/About.jsx'
import Login from './pages/login.jsx'
import Signup from './pages/signup.jsx'
import Dashboard from './pages/dashboard.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <Navbar />

      <div className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/edit-event/:id" element={<EditEvent />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={
              <main className="container page-header" style={{ padding: '64px 0', textAlign: 'center' }}>
                <p className="eyebrow" style={{ color: 'var(--color-coral)' }}>404 Error</p>
                <h1>Page Not Found</h1>
                <p style={{ margin: '12px auto 24px', maxWidth: '44ch' }}>
                  The page you're looking for doesn't exist or may have moved.
                </p>
                <Link to="/" className="btn btn-primary">
                  Back to Home
                </Link>
              </main>
            }
          />
        </Routes>
      </div>

      <footer className="footer">
        <div className="container footer-inner">
          <div>Built for the campus community — <strong>CampusEvent</strong> © {new Date().getFullYear()}</div>
          <div className="footer-links">
            <Link to="/">Home</Link>
            <Link to="/events">Events</Link>
            <Link to="/about">About</Link>
            <Link to="/create-event">Create Event</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
