function About() {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>About Us</h2>
      <p style={styles.description}>
        Eventify is a front-end React project designed to manage university
        clubs, events, and attendance records in one organized platform.
      </p>

      <div style={styles.card}>
        <p><strong>Fahda Abdullah</strong> – 222410504</p>
        <p><strong>Renad Hajij</strong> – 222411073</p>
        <p><strong>Souad</strong> – 222410010</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "40px 20px",
  },
  title: {
    color: "#1d4ed8",
    marginBottom: "12px",
    textAlign: "center",
  },
  description: {
    textAlign: "center",
    color: "#4b5563",
    lineHeight: "1.6",
    marginBottom: "24px",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "24px",
    borderRadius: "16px",
    boxShadow: "0 6px 18px rgba(0, 0, 0, 0.08)",
    lineHeight: "2",
    fontSize: "1rem",
  },
};

export default About;