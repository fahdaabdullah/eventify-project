import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={styles.nav}>
      <div style={styles.inner}>
        <div>
          <h2 style={styles.logo}>Eventify</h2>
          <p style={styles.tagline}>University Clubs Assets Management System</p>
        </div>

        <div style={styles.links}>
          <NavLink to="/" style={({ isActive }) => navLinkStyle(isActive)}>Home</NavLink>
          <NavLink to="/events" style={({ isActive }) => navLinkStyle(isActive)}>Events</NavLink>
          <NavLink to="/clubs" style={({ isActive }) => navLinkStyle(isActive)}>Clubs</NavLink>
          <NavLink to="/attendance" style={({ isActive }) => navLinkStyle(isActive)}>Attendance</NavLink>
          <NavLink to="/about" style={({ isActive }) => navLinkStyle(isActive)}>About</NavLink>
        </div>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    position: 'sticky',
    top: 0,
    zIndex: 10,
    backgroundColor: '#1d4ed8',
    boxShadow: '0 8px 24px rgba(15, 23, 42, 0.12)',
  },
  inner: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '16px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '12px',
  },
  logo: {
    margin: 0,
    color: '#ffffff',
    fontSize: '2rem',
    fontWeight: '700',
  },
  tagline: {
    margin: '4px 0 0',
    color: '#dbeafe',
    fontSize: '0.92rem',
  },
  links: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
  },
};

function navLinkStyle(isActive) {
  return {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: '0.98rem',
    padding: '10px 14px',
    borderRadius: '10px',
    backgroundColor: isActive ? 'rgba(255,255,255,0.18)' : 'transparent',
  };
}

export default Navbar;
