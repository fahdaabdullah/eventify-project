import { card, colors, pageShell } from '../styles_theme';

const teamMembers = [
  {
    name: 'Fahda Abdullah',
    studentId: '222410504',
    role: 'Events Module',
  },
  {
    name: 'Renad Hajij',
    studentId: '222411073',
    role: 'Clubs Module',
  },
  {
    name: 'Souad Kalou',
    studentId: '222410010',
    role: 'RSVP / Attendance Module and About Page',
  },
];

function About() {
  return (
    <div style={pageShell}>
      <section style={styles.hero}>
        <h2 style={styles.title}>About Eventify</h2>
        <p style={styles.description}>
          Eventify is a React front-end project developed for managing university club records in an organized,
          user-friendly interface. The system focuses on three main modules: events, clubs, and RSVP/attendance
          records, while also providing a clear navigation menu and a dedicated About page for the team.
        </p>
      </section>

      <section style={styles.teamGrid}>
        {teamMembers.map((member) => (
          <div key={member.studentId} style={styles.memberCard}>
            <div style={styles.badge}>Team Member</div>
            <h3 style={styles.memberName}>{member.name}</h3>
            <p><strong>Student ID:</strong> {member.studentId}</p>
            <p><strong>Role:</strong> {member.role}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

const styles = {
  hero: {
    ...card,
    textAlign: 'center',
    marginBottom: '24px',
  },
  title: {
    color: colors.primary,
    marginTop: 0,
    marginBottom: '12px',
  },
  description: {
    color: colors.muted,
    lineHeight: '1.7',
    maxWidth: '850px',
    margin: '0 auto',
  },
  teamGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '18px',
  },
  memberCard: {
    ...card,
    padding: '22px',
  },
  badge: {
    display: 'inline-block',
    marginBottom: '12px',
    padding: '6px 10px',
    borderRadius: '999px',
    backgroundColor: '#dbeafe',
    color: '#1e40af',
    fontSize: '0.85rem',
    fontWeight: '700',
  },
  memberName: {
    color: colors.primary,
    marginTop: 0,
    marginBottom: '12px',
  },
};

export default About;
