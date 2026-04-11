import { useState } from "react";

function Events() {
  const [events, setEvents] = useState([
    {
      id: "E101",
      title: "AI Workshop",
      club: "IEEE Club",
      date: "2026-04-10",
      venue: "Hall A",
      capacity: "80",
    },
    {
      id: "E102",
      title: "Hackathon",
      club: "Coding Club",
      date: "2026-04-18",
      venue: "Lab 3",
      capacity: "120",
    },
  ]);

  const [formData, setFormData] = useState({
    id: "",
    title: "",
    club: "",
    date: "",
    venue: "",
    capacity: "",
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
      title: "",
      club: "",
      date: "",
      venue: "",
      capacity: "",
    });
    setIsEditing(false);
    setEditingId(null);
    setErrorMessage("");
  }

  function validateForm() {
    if (
      !formData.id.trim() ||
      !formData.title.trim() ||
      !formData.club.trim() ||
      !formData.date.trim() ||
      !formData.venue.trim() ||
      !formData.capacity.trim()
    ) {
      setErrorMessage("Please fill in all fields.");
      return false;
    }

    if (isNaN(formData.capacity) || Number(formData.capacity) <= 0) {
      setErrorMessage("Capacity must be a valid positive number.");
      return false;
    }

    const duplicateId = events.some(
      (event) =>
        event.id.toLowerCase() === formData.id.toLowerCase() &&
        event.id !== editingId
    );

    if (duplicateId) {
      setErrorMessage("Event ID must be unique.");
      return false;
    }

    setErrorMessage("");
    return true;
  }

  function handleAddEvent(e) {
    e.preventDefault();

    if (!validateForm()) return;

    setEvents([...events, formData]);
    clearForm();
  }

  function handleEditEvent(event) {
    setFormData(event);
    setIsEditing(true);
    setEditingId(event.id);
    setErrorMessage("");
  }

  function handleUpdateEvent(e) {
    e.preventDefault();

    if (!validateForm()) return;

    const updatedEvents = events.map((event) =>
      event.id === editingId ? { ...formData } : event
    );

    setEvents(updatedEvents);
    clearForm();
  }

  function handleDeleteEvent(id) {
    const updatedEvents = events.filter((event) => event.id !== id);
    setEvents(updatedEvents);

    if (editingId === id) {
      clearForm();
    }
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Events Management</h2>
      <p style={styles.subtitle}>
        Add, update, delete, and display university events.
      </p>

      <form
        onSubmit={isEditing ? handleUpdateEvent : handleAddEvent}
        style={styles.form}
      >
        <h3 style={styles.formTitle}>
          {isEditing ? "Edit Event" : "Add New Event"}
        </h3>

        {errorMessage && <p style={styles.error}>{errorMessage}</p>}

        <div style={styles.grid}>
          <input
            type="text"
            name="id"
            placeholder="Event ID"
            value={formData.id}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={formData.title}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            type="text"
            name="club"
            placeholder="Club Name"
            value={formData.club}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            type="text"
            name="venue"
            placeholder="Venue"
            value={formData.venue}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            type="number"
            name="capacity"
            placeholder="Capacity"
            value={formData.capacity}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.buttonRow}>
          <button type="submit" style={styles.primaryButton}>
            {isEditing ? "Update Event" : "Add Event"}
          </button>
          <button type="button" onClick={clearForm} style={styles.secondaryButton}>
            Clear
          </button>
        </div>
      </form>

      <div>
        <h3 style={styles.sectionTitle}>Events List</h3>

        {events.length === 0 ? (
          <p>No events available.</p>
        ) : (
          <div style={styles.cardList}>
            {events.map((event) => (
              <div key={event.id} style={styles.card}>
                <h4 style={styles.cardTitle}>{event.title}</h4>
                <p><strong>ID:</strong> {event.id}</p>
                <p><strong>Club:</strong> {event.club}</p>
                <p><strong>Date:</strong> {event.date}</p>
                <p><strong>Venue:</strong> {event.venue}</p>
                <p><strong>Capacity:</strong> {event.capacity}</p>

                <div style={styles.buttonRow}>
                  <button
                    onClick={() => handleEditEvent(event)}
                    style={styles.editButton}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteEvent(event.id)}
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

export default Events;