import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import './dashboard.css'

function Dashboard() {
  const { user } = useAuth()

  return (
    <main className="container dashboard">
      <div className="page-header">
        <p className="eyebrow">Personal Dashboard</p>
        <h1>Welcome, {user?.name || 'Student'}</h1>
        <div className="dashboard-user-meta">
          <span>{user?.email}</span>
          <span className="role-badge">{user?.role || 'student'}</span>
        </div>
      </div>

      <div className="dashboard-quick-actions">
        <Link to="/create-event" className="btn btn-primary btn-sm">
          + Create New Event
        </Link>
        <Link to="/events" className="btn btn-outline btn-sm">
          Browse All Events
        </Link>
      </div>

      <div className="dashboard-grid">
        <section className="dashboard-card">
          <div className="dashboard-card-header">
            <h2>Upcoming Registered Events</h2>
            <span className="coming-soon-badge">Coming Soon</span>
          </div>
          <p className="dashboard-placeholder-text">
            Events you RSVP or register for on campus will appear here with calendar reminders.
          </p>
          <div className="dashboard-card-footer">
            <Link to="/events" className="btn btn-outline btn-sm">
              Discover Events to Join
            </Link>
          </div>
        </section>

        <section className="dashboard-card">
          <div className="dashboard-card-header">
            <h2>Organizer Hub & Activity</h2>
            <span className="status-badge-active">Active</span>
          </div>
          <p className="dashboard-placeholder-text">
            Manage events you've created for your campus clubs, edit schedules, and post updates.
          </p>
          <div className="dashboard-card-footer">
            <Link to="/create-event" className="btn btn-primary btn-sm">
              Post an Event
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}

export default Dashboard
