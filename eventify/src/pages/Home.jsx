import { Link } from 'react-router-dom';
import { card, colors, pageShell } from '../styles_theme';

function Home() {
  return (
    <div style={pageShell}>
      <section style={styles.hero}>
        <h1 style={styles.title}>Welcome to Eventify</h1>
        <p style={styles.subtitle}>
          Eventify is a university clubs assets management system that helps users manage three main record types:
          events, clubs, and RSVP/attendance records. The application supports adding, updating, deleting,
          and displaying records through a simple React interface.
        </p>

        <div style={styles.heroButtons}>
          <Link to="/events" style={styles.primaryLink}>Manage Events</Link>
          <Link to="/about" style={styles.secondaryLink}>View Team</Link>
        </div>
      </section>

      <section style={styles.cards}>
        <div style={styles.moduleCard}>
          <h3 style={styles.cardTitle}>Events Module</h3>
          <p style={styles.cardText}>
            Add, edit, delete, and display event records.
          </p>
        </div>

        <div style={styles.moduleCard}>
          <h3 style={styles.cardTitle}>Clubs Module</h3>
          <p style={styles.cardText}>
            Add, edit, delete, and display club records.
          </p>
        </div>

        <div style={styles.moduleCard}>
          <h3 style={styles.cardTitle}>RSVP and Attendance Module</h3>
          <p style={styles.cardText}>
            Add, edit, delete, and display RSVP and attendance records.
          </p>
        </div>
      </section>
    </div>
  );
}

const styles = {
  hero: {
    ...card,
    textAlign: 'center',
    padding: '42px 28px',
    marginBottom: '28px',
    background: 'linear-gradient(135deg, #eff6ff 0%, #ffffff 65%)',
  },
  title: {
    color: colors.primary,
    marginBottom: '12px',
    fontSize: '2.5rem',
  },
  subtitle: {
    color: colors.muted,
    fontSize: '1.05rem',
    maxWidth: '780px',
    margin: '0 auto',
    lineHeight: '1.7',
  },
  heroButtons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '14px',
    marginTop: '24px',
    flexWrap: 'wrap',
  },
  primaryLink: {
    backgroundColor: colors.primary,
    color: '#fff',
    padding: '12px 18px',
    borderRadius: '12px',
    fontWeight: '700',
  },
  secondaryLink: {
    backgroundColor: '#dbeafe',
    color: '#1e40af',
    padding: '12px 18px',
    borderRadius: '12px',
    fontWeight: '700',
  },
  cards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '18px',
  },
  moduleCard: {
    ...card,
    padding: '24px',
  },
  cardTitle: {
    color: colors.primary,
    marginTop: 0,
    marginBottom: '10px',
  },
  cardText: {
    color: colors.muted,
    lineHeight: '1.6',
    marginBottom: 0,
  },
};

export default Home;
