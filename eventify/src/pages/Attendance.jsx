import { useState } from "react";

function Attendance() {
  const [records, setRecords] = useState([
    {
      id: "A101",
      name: "Ali Ahmed",
      studentId: "2023001",
      event: "AI Workshop",
      status: "Present",
    },
    {
      id: "A102",
      name: "Sara Khalid",
      studentId: "2023002",
      event: "Hackathon",
      status: "Absent",
    },
  ]);

  const [form, setForm] = useState({
    id: "",
    name: "",
    studentId: "",
    event: "",
    status: "Present",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  }

  function clearForm() {
    setForm({
      id: "",
      name: "",
      studentId: "",
      event: "",
      status: "Present",
    });
    setIsEditing(false);
    setEditingId(null);
    setErrorMessage("");
  }

  function validateForm() {
    if (
      !form.id.trim() ||
      !form.name.trim() ||
      !form.studentId.trim() ||
      !form.event.trim()
    ) {
      setErrorMessage("Please fill in all fields.");
      return false;
    }

    const duplicateId = records.some(
      (record) =>
        record.id.toLowerCase() === form.id.toLowerCase() &&
        record.id !== editingId
    );

    if (duplicateId) {
      setErrorMessage("Record ID must be unique.");
      return false;
    }

    setErrorMessage("");
    return true;
  }

  function handleAdd(e) {
    e.preventDefault();

    if (!validateForm()) return;

    setRecords([...records, form]);
    clearForm();
  }

  function handleEdit(record) {
    setForm(record);
    setIsEditing(true);
    setEditingId(record.id);
    setErrorMessage("");
  }

  function handleUpdate(e) {
    e.preventDefault();

    if (!validateForm()) return;

    const updatedRecords = records.map((record) =>
      record.id === editingId ? { ...form } : record
    );

    setRecords(updatedRecords);
    clearForm();
  }

  function handleDelete(id) {
    const updatedRecords = records.filter((record) => record.id !== id);
    setRecords(updatedRecords);

    if (editingId === id) {
      clearForm();
    }
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Attendance Records</h2>
      <p style={styles.subtitle}>
        Add, update, delete, and display attendance records.
      </p>

      <form onSubmit={isEditing ? handleUpdate : handleAdd} style={styles.form}>
        <h3 style={styles.formTitle}>
          {isEditing ? "Edit Attendance Record" : "Add Attendance Record"}
        </h3>

        {errorMessage && <p style={styles.error}>{errorMessage}</p>}

        <div style={styles.grid}>
          <input
            type="text"
            name="id"
            placeholder="Record ID"
            value={form.id}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="text"
            name="name"
            placeholder="Student Name"
            value={form.name}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="text"
            name="studentId"
            placeholder="Student ID"
            value={form.studentId}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="text"
            name="event"
            placeholder="Event Title"
            value={form.event}
            onChange={handleChange}
            style={styles.input}
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>
        </div>

        <div style={styles.buttonRow}>
          <button type="submit" style={styles.primaryButton}>
            {isEditing ? "Update Record" : "Add Record"}
          </button>

          <button type="button" onClick={clearForm} style={styles.secondaryButton}>
            Clear
          </button>
        </div>
      </form>

      <div>
        <h3 style={styles.sectionTitle}>Attendance List</h3>

        {records.length === 0 ? (
          <p>No attendance records available.</p>
        ) : (
          <div style={styles.cardList}>
            {records.map((record) => (
              <div key={record.id} style={styles.card}>
                <h4 style={styles.cardTitle}>{record.name}</h4>
                <p><strong>Record ID:</strong> {record.id}</p>
                <p><strong>Student ID:</strong> {record.studentId}</p>
                <p><strong>Event:</strong> {record.event}</p>
                <p><strong>Status:</strong> {record.status}</p>

                <div style={styles.buttonRow}>
                  <button
                    onClick={() => handleEdit(record)}
                    style={styles.editButton}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(record.id)}
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

export default Attendance;