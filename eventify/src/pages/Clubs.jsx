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

const API_URL = 'http://localhost:8080/api/clubs';

const emptyForm = {
  id: '',
  name: '',
  category: '',
  president: '',
  email: '',
  membersCount: '',
};

export default function Clubs() {
  const [clubs, setClubs] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchClubs();
  }, []);

  async function fetchClubs() {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error('Failed to fetch clubs');
      }

      const data = await response.json();
      setClubs(data);
    } catch (error) {
      setErrorMessage('Could not load clubs from the server.');
    }
  }

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
      !membersCount.toString().trim()
    ) {
      setErrorMessage('Please fill in all club fields.');
      return false;
    }

    if (!/^CLB-\d{3}$/i.test(id.trim())) {
      setErrorMessage('Club ID must follow this format: CLB-101');
      return false;
    }

    if (name.trim().length < 3) {
      setErrorMessage('Club name must contain at least 3 characters.');
      return false;
    }

    if (category.trim().length < 3) {
      setErrorMessage('Category must contain at least 3 characters.');
      return false;
    }

    if (president.trim().length < 3) {
      setErrorMessage('President name must contain at least 3 characters.');
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMessage('Please enter a valid email address.');
      return false;
    }

    if (!/^\d+$/.test(membersCount.toString()) || Number(membersCount) <= 0) {
      setErrorMessage('Number of members must be a valid positive whole number.');
      return false;
    }

    const normalizedId = id.trim().toUpperCase();

    const duplicateId = clubs.some(
      (club) =>
        club.id.toUpperCase() === normalizedId &&
        club.id !== editingId
    );

    if (duplicateId) {
      setErrorMessage('Club ID must be unique.');
      return false;
    }

    setErrorMessage('');
    return true;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validateForm()) return;

    const normalizedClub = {
      id: formData.id.trim().toUpperCase(),
      name: formData.name.trim(),
      category: formData.category.trim(),
      president: formData.president.trim(),
      email: formData.email.trim().toLowerCase(),
      membersCount: Number(formData.membersCount),
    };

    try {
      const url = isEditing ? `${API_URL}/${editingId}` : API_URL;
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(normalizedClub),
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      await fetchClubs();
      clearForm();
    } catch (error) {
      setErrorMessage('Could not save the club on the server.');
    }
  }

  function handleEditClub(club) {
    setFormData({
      id: club.id,
      name: club.name,
      category: club.category,
      president: club.president,
      email: club.email,
      membersCount: String(club.membersCount),
    });

    setIsEditing(true);
    setEditingId(club.id);
    setErrorMessage('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function handleDeleteClub(id) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Delete failed');
      }

      await fetchClubs();

      if (editingId === id) {
        clearForm();
      }
    } catch (error) {
      setErrorMessage('Could not delete the club from the server.');
    }
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
            disabled={isEditing}
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
        <p style={{ ...helperText, marginTop: 0 }}>
          Changes are now saved in the Spring Boot server using an embedded H2 database.
        </p>

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