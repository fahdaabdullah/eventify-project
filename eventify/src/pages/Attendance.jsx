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

const API_URL = 'http://localhost:8080/api/attendance';

const emptyForm = {
  id: '',
  name: '',
  studentId: '',
  event: '',
  rsvpStatus: 'Going',
  attendanceStatus: 'Present',
};

function Attendance() {
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchAttendanceRecords();
  }, []);

  async function fetchAttendanceRecords() {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error('Failed to fetch attendance records');
      }

      const data = await response.json();
      setRecords(data);
    } catch (error) {
      setErrorMessage('Could not load attendance records from the server.');
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function clearForm() {
    setForm(emptyForm);
    setIsEditing(false);
    setEditingId(null);
    setErrorMessage('');
  }

  function validateForm() {
    const { id, name, studentId, event, rsvpStatus, attendanceStatus } = form;

    if (
      !id.trim() ||
      !name.trim() ||
      !studentId.trim() ||
      !event.trim() ||
      !rsvpStatus.trim() ||
      !attendanceStatus.trim()
    ) {
      setErrorMessage('Please fill in all attendance fields.');
      return false;
    }

    if (!/^ATD-\d{3}$/i.test(id.trim())) {
      setErrorMessage('Record ID must follow this format: ATD-101');
      return false;
    }

    if (name.trim().length < 3) {
      setErrorMessage('Student name must contain at least 3 characters.');
      return false;
    }

    if (!/^\d{7}$/.test(studentId.trim())) {
      setErrorMessage('Student ID must contain exactly 7 digits.');
      return false;
    }

    if (event.trim().length < 3) {
      setErrorMessage('Event title must contain at least 3 characters.');
      return false;
    }

    const normalizedId = id.trim().toUpperCase();

    const duplicateId = records.some(
      (record) =>
        record.id.toUpperCase() === normalizedId &&
        record.id !== editingId
    );

    if (duplicateId) {
      setErrorMessage('Record ID must be unique.');
      return false;
    }

    setErrorMessage('');
    return true;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validateForm()) return;

    const normalizedRecord = {
      id: form.id.trim().toUpperCase(),
      name: form.name.trim(),
      studentId: form.studentId.trim(),
      event: form.event.trim(),
      rsvpStatus: form.rsvpStatus,
      attendanceStatus: form.attendanceStatus,
    };

    try {
      const url = isEditing ? `${API_URL}/${editingId}` : API_URL;
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(normalizedRecord),
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      await fetchAttendanceRecords();
      clearForm();
    } catch (error) {
      setErrorMessage('Could not save the attendance record on the server.');
    }
  }

  function handleEdit(record) {
    setForm({
      id: record.id,
      name: record.name,
      studentId: record.studentId,
      event: record.event,
      rsvpStatus: record.rsvpStatus,
      attendanceStatus: record.attendanceStatus,
    });

    setIsEditing(true);
    setEditingId(record.id);
    setErrorMessage('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function handleDelete(id) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Delete failed');
      }

      await fetchAttendanceRecords();

      if (editingId === id) {
        clearForm();
      }
    } catch (error) {
      setErrorMessage('Could not delete the attendance record from the server.');
    }
  }

  return (
    <div style={pageShell}>
      <h2 style={sectionTitle}>RSVP and Attendance Records</h2>
      <p style={sectionSubtitle}>
        Store student RSVP decisions and attendance outcomes in one place for each event record.
      </p>

      <form onSubmit={handleSubmit} style={card}>
        <h3 style={{ ...sectionTitle, marginTop: 0 }}>
          {isEditing ? 'Edit Attendance Record' : 'Add Attendance Record'}
        </h3>

        <p style={{ ...helperText, marginTop: 0 }}>
          Use a Record ID such as <strong>ATD-101</strong> and a 7-digit Student ID.
        </p>

        {errorMessage && <div style={errorBox}>{errorMessage}</div>}

        <div style={formGrid}>
          <input
            type="text"
            name="id"
            placeholder="Record ID (ATD-101)"
            value={form.id}
            onChange={handleChange}
            style={inputBase}
            disabled={isEditing}
          />

          <input
            type="text"
            name="name"
            placeholder="Student Name"
            value={form.name}
            onChange={handleChange}
            style={inputBase}
          />

          <input
            type="text"
            name="studentId"
            placeholder="Student ID"
            value={form.studentId}
            onChange={handleChange}
            style={inputBase}
          />

          <input
            type="text"
            name="event"
            placeholder="Event Title"
            value={form.event}
            onChange={handleChange}
            style={inputBase}
          />

          <select
            name="rsvpStatus"
            value={form.rsvpStatus}
            onChange={handleChange}
            style={inputBase}
          >
            <option value="Going">Going</option>
            <option value="Maybe">Maybe</option>
            <option value="Not Going">Not Going</option>
          </select>

          <select
            name="attendanceStatus"
            value={form.attendanceStatus}
            onChange={handleChange}
            style={inputBase}
          >
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>
        </div>

        <div style={buttonRow}>
          <button type="submit" style={primaryButton}>
            {isEditing ? 'Update Record' : 'Add Record'}
          </button>

          <button type="button" onClick={clearForm} style={secondaryButton}>
            Clear
          </button>
        </div>
      </form>

      <div style={{ marginTop: '28px' }}>
        <h3 style={{ ...sectionTitle, marginTop: 0 }}>Records List</h3>

        <p style={{ ...helperText, marginTop: 0 }}>
          Changes are now saved in the Spring Boot server using an embedded H2 database.
        </p>

        {records.length === 0 ? (
          <div style={emptyState}>No attendance records available yet.</div>
        ) : (
          <div style={styles.cardList}>
            {records.map((record) => (
              <div key={record.id} style={styles.itemCard}>
                <div style={styles.badge}>Attendance Record</div>
                <h4 style={styles.cardTitle}>{record.name}</h4>

                <p><strong>Record ID:</strong> {record.id}</p>
                <p><strong>Student ID:</strong> {record.studentId}</p>
                <p><strong>Event:</strong> {record.event}</p>
                <p><strong>RSVP Status:</strong> {record.rsvpStatus}</p>
                <p><strong>Attendance Status:</strong> {record.attendanceStatus}</p>

                <div style={buttonRow}>
                  <button onClick={() => handleEdit(record)} style={editButton}>
                    Edit
                  </button>

                  <button onClick={() => handleDelete(record.id)} style={deleteButton}>
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

export default Attendance;