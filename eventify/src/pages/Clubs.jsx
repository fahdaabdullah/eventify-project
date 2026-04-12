import { useEffect, useState } from 'react';
import {
  buttonRow,
  card,
  colors,
  deleteButton,
  editButton,
  emptyState,
  errorBox,
  formGrid,
  helperText,
  inputBase,
  pageShell,
  primaryButton,
  secondaryButton,
  sectionSubtitle,
  sectionTitle,
} from '../styles_theme';

const STORAGE_KEY = 'eventify-clubs';

const initialClubs = [
  {
    id: 'CLB-101',
    name: 'IEEE Club',
    category: 'Technology',
    president: 'Ali Hassan',
    email: 'ieee@university.edu',
    membersCount: '85',
  },
  {
    id: 'CLB-102',
    name: 'Debate Club',
    category: 'Academic',
    president: 'Sara Ahmed',
    email: 'debate@university.edu',
    membersCount: '40',
  },
  {
    id: 'CLB-103',
    name: 'Art Club',
    category: 'Creative',
    president: 'Lina Omar',
    email: 'art@university.edu',
    membersCount: '55',
  },
];

const emptyForm = {
  id: '',
  name: '',
  category: '',
  president: '',
  email: '',
  membersCount: '',
};

export default function Clubs() {
  const [clubs, setClubs] = useState(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialClubs;
  });
  const [formData, setFormData] = useState(emptyForm);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(clubs));
  }, [clubs]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function clearForm() {
    setFormData(emptyForm);
    setIsEditing(false);
    setEditingId(null);
    setErrorMessage('');
  }

  function validateForm() {
    const { id, name, category, president, email, membersCount } = formData;

    if (
      !id.trim() ||
      !name.trim() ||
      !category.trim() ||
      !president.trim() ||
      !email.trim() ||
      !membersCount.trim()
    ) {
      setErrorMessage('Please fill in all club fields.');
      return false;
    }

    if (!/^CLB-\d{3}$/i.test(id.trim())) {
      setErrorMessage('Club ID must follow this format: CLB-101');
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMessage('Please enter a valid email address.');
      return false;
    }

    if (!/^\d+$/.test(membersCount) || Number(membersCount) <= 0) {
      setErrorMessage('Number of members must be a valid positive whole number.');
      return false;
    }

    const duplicateId = clubs.some(
      (club) =>
        club.id.toLowerCase() === id.trim().toLowerCase() &&
        club.id !== editingId
    );

    if (duplicateId) {
      setErrorMessage('Club ID must be unique.');
      return false;
    }

    setErrorMessage('');
    return true;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validateForm()) return;

    const normalizedClub = {
      id: formData.id.trim().toUpperCase(),
      name: formData.name.trim(),
      category: formData.category.trim(),
      president: formData.president.trim(),
      email: formData.email.trim().toLowerCase(),
      membersCount: String(Number(formData.membersCount)),
    };

    if (isEditing) {
      setClubs((prev) =>
        prev.map((club) => (club.id === editingId ? normalizedClub : club))
      );
    } else {
      setClubs((prev) => [...prev, normalizedClub]);
    }

    clearForm();
  }

  function handleEditClub(club) {
    setFormData(club);
    setIsEditing(true);
    setEditingId(club.id);
    setErrorMessage('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleDeleteClub(id) {
    setClubs((prev) => prev.filter((club) => club.id !== id));
    if (editingId === id) clearForm();
  }

  return (
    <div style={pageShell}>
      <h2 style={sectionTitle}>Clubs Management</h2>
      <p style={sectionSubtitle}>
        Manage club records by storing club details, leadership information, and the number of members.
      </p>

      <form onSubmit={handleSubmit} style={card}>
        <h3 style={{ ...sectionTitle, marginTop: 0 }}>
          {isEditing ? 'Edit Club' : 'Add New Club'}
        </h3>
        <p style={{ ...helperText, marginTop: 0 }}>
          Use a Club ID such as <strong>CLB-101</strong>.
        </p>

        {errorMessage && <div style={errorBox}>{errorMessage}</div>}

        <div style={formGrid}>
          <input
            type="text"
            name="id"
            placeholder="Club ID (CLB-101)"
            value={formData.id}
            onChange={handleChange}
            style={inputBase}
          />
          <input
            type="text"
            name="name"
            placeholder="Club Name"
            value={formData.name}
            onChange={handleChange}
            style={inputBase}
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            style={inputBase}
          />
          <input
            type="text"
            name="president"
            placeholder="President Name"
            value={formData.president}
            onChange={handleChange}
            style={inputBase}
          />
          <input
            type="email"
            name="email"
            placeholder="Contact Email"
            value={formData.email}
            onChange={handleChange}
            style={inputBase}
          />
          <input
            type="number"
            name="membersCount"
            placeholder="Number of Members"
            min="1"
            step="1"
            value={formData.membersCount}
            onChange={handleChange}
            style={inputBase}
          />
        </div>

        <div style={buttonRow}>
          <button type="submit" style={primaryButton}>
            {isEditing ? 'Update Club' : 'Add Club'}
          </button>
          <button type="button" onClick={clearForm} style={secondaryButton}>
            Clear
          </button>
        </div>
      </form>

      <div style={{ marginTop: '28px' }}>
        <h3 style={{ ...sectionTitle, marginTop: 0 }}>Clubs List</h3>

        {clubs.length === 0 ? (
          <div style={emptyState}>No clubs available yet.</div>
        ) : (
          <div style={styles.cardList}>
            {clubs.map((club) => (
              <div key={club.id} style={styles.itemCard}>
                <div style={styles.badge}>Club Profile</div>
                <h4 style={styles.cardTitle}>{club.name}</h4>
                <p><strong>Club ID:</strong> {club.id}</p>
                <p><strong>Category:</strong> {club.category}</p>
                <p><strong>President:</strong> {club.president}</p>
                <p><strong>Email:</strong> {club.email}</p>
                <p><strong>Number of Members:</strong> {club.membersCount}</p>

                <div style={buttonRow}>
                  <button onClick={() => handleEditClub(club)} style={editButton}>
                    Edit
                  </button>
                  <button onClick={() => handleDeleteClub(club.id)} style={deleteButton}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  cardList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '18px',
  },
  itemCard: {
    ...card,
    padding: '20px',
  },
  badge: {
    display: 'inline-block',
    marginBottom: '12px',
    padding: '6px 10px',
    borderRadius: '999px',
    backgroundColor: colors.primarySoft,
    color: colors.primaryDark,
    fontSize: '0.85rem',
    fontWeight: '700',
  },
  cardTitle: {
    marginTop: 0,
    marginBottom: '12px',
    color: colors.primary,
  },
};
