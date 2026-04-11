import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={styles.nav}>
      <div style={styles.inner}>
        <h2 style={styles.logo}>Eventify</h2>

        <div style={styles.links}>
          <Link to="/" style={styles.link}>Home</Link>
          <Link to="/events" style={styles.link}>Events</Link>
          <Link to="/clubs" style={styles.link}>Clubs</Link>
          <Link to="/attendance" style={styles.link}>Attendance</Link>
          <Link to="/about" style={styles.link}>About</Link>
        </div>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    backgroundColor: "#1d4ed8",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.08)",
  },
  inner: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "16px 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "12px",
  },
  logo: {
    margin: 0,
    color: "#ffffff",
    fontSize: "2rem",
    fontWeight: "700",
  },
  links: {
    display: "flex",
    gap: "22px",
    flexWrap: "wrap",
  },
  link: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: "1rem",
  },
};

export default Navbar;