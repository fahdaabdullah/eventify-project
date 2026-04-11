function Home() {
  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <h1 style={styles.title}>Welcome to Eventify</h1>
        <p style={styles.subtitle}>
          A simple university club events asset management system for managing
          events, clubs, and attendance records.
        </p>
      </div>

      <div style={styles.cards}>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Events</h3>
          <p style={styles.cardText}>
            Add, update, and organize university events.
          </p>
        </div>

        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Clubs</h3>
          <p style={styles.cardText}>
            Manage club profiles, categories, and leadership details.
          </p>
        </div>

        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Attendance</h3>
          <p style={styles.cardText}>
            Track student participation and attendance records.
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "40px 20px",
  },
  hero: {
    textAlign: "center",
    marginBottom: "40px",
  },
  title: {
    color: "#1d4ed8",
    marginBottom: "12px",
    fontSize: "2.4rem",
  },
  subtitle: {
    color: "#4b5563",
    fontSize: "1.05rem",
    maxWidth: "700px",
    margin: "0 auto",
    lineHeight: "1.6",
  },
  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "20px",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    padding: "24px",
    boxShadow: "0 6px 18px rgba(0, 0, 0, 0.08)",
  },
  cardTitle: {
    color: "#1d4ed8",
    marginBottom: "10px",
  },
  cardText: {
    color: "#4b5563",
    lineHeight: "1.6",
  },
};

export default Home;