import { Link } from 'react-router-dom'

function About() {
  return (
    <main className="container" style={{ maxWidth: 840, paddingBottom: 88 }}>
      <div className="page-header" style={{ paddingBottom: 32 }}>
        <p className="eyebrow">About CampusEvent</p>
        <h1>One Board for Every Campus Event</h1>
        <p style={{ fontSize: '1.08rem', lineHeight: 1.65, marginTop: 12 }}>
          CampusEvent is built to solve a common college challenge: student events, hackathons,
          workshops, and cultural celebrations getting lost across scattered chat groups, posters,
          and emails.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, marginBottom: 40 }}>
        <div style={{ background: 'var(--color-paper-raised)', border: '1px solid var(--color-line)', borderRadius: 'var(--radius-md)', padding: 24, boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ fontSize: '1.15rem', marginBottom: 8 }}>For Students</h3>
          <p style={{ color: 'var(--color-muted)', fontSize: '0.92rem', lineHeight: 1.55 }}>
            Discover upcoming hackathons, guest lectures, cultural fests, and club auditions with instant search and date filters.
          </p>
        </div>

        <div style={{ background: 'var(--color-paper-raised)', border: '1px solid var(--color-line)', borderRadius: 'var(--radius-md)', padding: 24, boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ fontSize: '1.15rem', marginBottom: 8 }}>For Organizers</h3>
          <p style={{ color: 'var(--color-muted)', fontSize: '0.92rem', lineHeight: 1.55 }}>
            Publish event details, dates, and venues directly to the campus board so every student stays informed in real time.
          </p>
        </div>

        <div style={{ background: 'var(--color-paper-raised)', border: '1px solid var(--color-line)', borderRadius: 'var(--radius-md)', padding: 24, boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ fontSize: '1.15rem', marginBottom: 8 }}>Open & Accessible</h3>
          <p style={{ color: 'var(--color-muted)', fontSize: '0.92rem', lineHeight: 1.55 }}>
            Designed for speed, clarity, and accessibility across phones, tablets, and desktop workstations.
          </p>
        </div>
      </div>

      <div style={{ background: 'var(--color-paper-raised)', border: '1px solid var(--color-line)', borderRadius: 'var(--radius-md)', padding: '32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
        <div>
          <h2 style={{ fontSize: '1.35rem', marginBottom: 6 }}>Ready to post an event?</h2>
          <p style={{ color: 'var(--color-muted)', fontSize: '0.95rem' }}>Add your club or department activity to the campus board now.</p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <Link to="/create-event" className="btn btn-primary">
            Create Event
          </Link>
          <Link to="/events" className="btn btn-outline">
            Browse Events
          </Link>
        </div>
      </div>
    </main>
  )
}

export default About
