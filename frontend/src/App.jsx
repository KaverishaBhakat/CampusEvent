import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Events from './pages/Events.jsx'
import EventDetails from './pages/EventDetails.jsx'
import CreateEvent from './pages/CreateEvent.jsx'
import EditEvent from './pages/EditEvent.jsx'
import About from './pages/About.jsx'
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
          <Route
            path="*"
            element={
              <main className="container page-header">
                <h1>Page not found</h1>
                <p>The page you're looking for doesn't exist.</p>
              </main>
            }
          />
        </Routes>
      </div>

      <footer className="footer">
        <div className="container">Built for the campus hackathon — CampusEvent © 2026</div>
      </footer>
    </div>
  )
}

export default App
