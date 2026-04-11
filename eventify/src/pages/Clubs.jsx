import { useState } from "react";

export default function Clubs() {
  const [clubs, setClubs] = useState([
    {
      id: "C101",
      name: "IEEE Club",
      category: "Technology",
      president: "Ali Hassan",
      email: "ieee@university.edu",
    },
    {
      id: "C102",
      name: "Debate Club",
      category: "Academic",
      president: "Sara Ahmed",
      email: "debate@university.edu",
    },
    {
      id: "C103",
      name: "Art Club",
      category: "Creative",
      president: "Lina Omar",
      email: "art@university.edu",
    },
  ]);

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    category: "",
    president: "",
    email: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function clearForm() {
    setFormData({
      id: "",
      name: "",
      category: "",
      president: "",
      email: "",
    });
    setIsEditing(false);
    setEditingId(null);
    setErrorMessage("");
  }

  function validateForm() {
    if (
      !formData.id.trim() ||
      !formData.name.trim() ||
      !formData.category.trim() ||
      !formData.president.trim() ||
      !formData.email.trim()
    ) {
      setErrorMessage("Please fill in all fields.");
      return false;
    }

    const emailIsValid = /\S+@\S+\.\S+/.test(formData.email);
    if (!emailIsValid) {
      setErrorMessage("Please enter a valid email address.");
      return false;
    }

    const duplicateId = clubs.some(
      (club) =>
        club.id.toLowerCase() === formData.id.toLowerCase() &&
        club.id !== editingId
    );

    if (duplicateId) {
      setErrorMessage("Club ID must be unique.");
      return false;
    }

    setErrorMessage("");
    return true;
  }

  function handleAddClub(e) {
    e.preventDefault();

    if (!validateForm()) return;

    const newClub = {
      id: formData.id,
      name: formData.name,
      category: formData.category,
      president: formData.president,
      email: formData.email,
    };

    setClubs([...clubs, newClub]);
    clearForm();
  }

  function handleEditClub(club) {
    setFormData({
      id: club.id,
      name: club.name,
      category: club.category,
      president: club.president,
      email: club.email,
    });
    setIsEditing(true);
    setEditingId(club.id);
    setErrorMessage("");
  }

  function handleUpdateClub(e) {
    e.preventDefault();

    if (!validateForm()) return;

    const updatedClubs = clubs.map((club) =>
      club.id === editingId ? { ...formData } : club
    );

    setClubs(updatedClubs);
    clearForm();
  }

  function handleDeleteClub(id) {
    const updatedClubs = clubs.filter((club) => club.id !== id);
    setClubs(updatedClubs);

    if (editingId === id) {
      clearForm();
    }
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Clubs Management</h2>
      <p style={styles.subtitle}>
        Add, update, delete, and display university clubs.
      </p>

      <form
        onSubmit={isEditing ? handleUpdateClub : handleAddClub}
        style={styles.form}
      >
        <h3 style={styles.formTitle}>
          {isEditing ? "Edit Club" : "Add New Club"}
        </h3>

        {errorMessage && <p style={styles.error}>{errorMessage}</p>}

        <div style={styles.grid}>
          <input
            type="text"
            name="id"
            placeholder="Club ID"
            value={formData.id}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="text"
            name="name"
            placeholder="Club Name"
            value={formData.name}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="text"
            name="president"
            placeholder="President Name"
            value={formData.president}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="email"
            name="email"
            placeholder="Contact Email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.buttonRow}>
          <button type="submit" style={styles.primaryButton}>
            {isEditing ? "Update Club" : "Add Club"}
          </button>

          <button type="button" onClick={clearForm} style={styles.secondaryButton}>
            Clear
          </button>
        </div>
      </form>

      <div>
        <h3 style={styles.sectionTitle}>Clubs List</h3>

        {clubs.length === 0 ? (
          <p>No clubs available.</p>
        ) : (
          <div style={styles.cardList}>
            {clubs.map((club) => (
              <div key={club.id} style={styles.card}>
                <h4 style={styles.cardTitle}>{club.name}</h4>
                <p><strong>ID:</strong> {club.id}</p>
                <p><strong>Category:</strong> {club.category}</p>
                <p><strong>President:</strong> {club.president}</p>
                <p><strong>Email:</strong> {club.email}</p>

                <div style={styles.buttonRow}>
                  <button
                    onClick={() => handleEditClub(club)}
                    style={styles.editButton}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClub(club.id)}
                    style={styles.deleteButton}
                  >
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
  container: {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    color: "#0d47a1",
    marginBottom: "10px",
  },
  subtitle: {
    marginBottom: "25px",
    color: "#444",
  },
  form: {
    backgroundColor: "#f5f7fb",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    marginBottom: "30px",
  },
  formTitle: {
    marginBottom: "15px",
    color: "#0d47a1",
  },
  error: {
    color: "red",
    marginBottom: "15px",
    fontWeight: "bold",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "15px",
  },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "14px",
  },
  buttonRow: {
    marginTop: "20px",
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },
  primaryButton: {
    padding: "10px 16px",
    backgroundColor: "#0d47a1",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  secondaryButton: {
    padding: "10px 16px",
    backgroundColor: "#e0e0e0",
    color: "#333",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  sectionTitle: {
    color: "#0d47a1",
    marginBottom: "15px",
  },
  cardList: {
    display: "grid",
    gap: "15px",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "18px",
    backgroundColor: "#ffffff",
    boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
  },
  cardTitle: {
    marginBottom: "10px",
    color: "#1565c0",
  },
  editButton: {
    padding: "8px 14px",
    backgroundColor: "#1976d2",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  deleteButton: {
    padding: "8px 14px",
    backgroundColor: "#d32f2f",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};