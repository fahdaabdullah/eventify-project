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
  textareaBase,
} from '../styles_theme';

const STORAGE_KEY = 'eventify-events';

const initialEvents = [
  {
    id: 'EVT-101',
    title: 'AI Workshop',
    club: 'IEEE Club',
    date: '2026-04-20',
    venue: 'Engineering Hall',
    capacity: '120',
    description:
      'A hands-on workshop that introduces students to practical AI tools and basic model concepts.',
  },
  {
    id: 'EVT-102',
    title: 'Hackathon',
    club: 'Computer Science Club',
    date: '2026-05-03',
    venue: 'Innovation Lab',
    capacity: '80',
    description:
      'A university hackathon where teams collaborate to build creative technology solutions.',
  },
];

const emptyForm = {
  id: '',
  title: '',
  club: '',
  date: '',
  venue: '',
  capacity: '',
  description: '',
};

function Events() {
  const [events, setEvents] = useState(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialEvents;
  });
  const [formData, setFormData] = useState(emptyForm);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  }, [events]);

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
    const { id, title, club, date, venue, capacity, description } = formData;

    if (
      !id.trim() ||
      !title.trim() ||
      !club.trim() ||
      !date.trim() ||
      !venue.trim() ||
      !capacity.trim() ||
      !description.trim()
    ) {
      setErrorMessage('Please fill in all event fields.');
      return false;
    }

    if (!/^EVT-\d{3}$/i.test(id.trim())) {
      setErrorMessage('Event ID must follow this format: EVT-101');
      return false;
    }

    if (title.trim().length < 3) {
      setErrorMessage('Event title must contain at least 3 characters.');
      return false;
    }

    if (club.trim().length < 3) {
      setErrorMessage('Club name must contain at least 3 characters.');
      return false;
    }

    if (venue.trim().length < 3) {
      setErrorMessage('Venue must contain at least 3 characters.');
      return false;
    }

    if (!/^\d+$/.test(capacity) || Number(capacity) <= 0) {
      setErrorMessage('Capacity must be a valid positive whole number.');
      return false;
    }

    if (description.trim().length < 15) {
      setErrorMessage('Description should be at least 15 characters long.');
      return false;
    }

    const duplicateId = events.some(
      (event) =>
        event.id.toLowerCase() === id.trim().toLowerCase() &&
        event.id !== editingId
    );

    if (duplicateId) {
      setErrorMessage('Event ID must be unique.');
      return false;
    }

    setErrorMessage('');
    return true;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!validateForm()) return;

    const normalizedEvent = {
      id: formData.id.trim().toUpperCase(),
      title: formData.title.trim(),
      club: formData.club.trim(),
      date: formData.date,
      venue: formData.venue.trim(),
      capacity: String(Number(formData.capacity)),
      description: formData.description.trim(),
    };

    if (isEditing) {
      setEvents((prev) =>
        prev.map((event) =>
          event.id === editingId ? normalizedEvent : event
        )
      );
    } else {
      setEvents((prev) => [...prev, normalizedEvent]);
    }

    clearForm();
  }

  function handleEditEvent(event) {
    setFormData(event);
    setIsEditing(true);
    setEditingId(event.id);
    setErrorMessage('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleDeleteEvent(id) {
    setEvents((prev) => prev.filter((event) => event.id !== id));
    if (editingId === id) clearForm();
  }

  return (
    <div style={pageShell}>
      <h2 style={sectionTitle}>Events Management</h2>
      <p style={sectionSubtitle}>
        Manage university event records by adding, updating, deleting, and displaying each event clearly.
      </p>

      <form onSubmit={handleSubmit} style={card}>
        <h3 style={{ ...sectionTitle, marginTop: 0 }}>
          {isEditing ? 'Edit Event' : 'Add New Event'}
        </h3>
        <p style={{ ...helperText, marginTop: 0 }}>
          Use an Event ID such as <strong>EVT-101</strong>.
        </p>

        {errorMessage && <div style={errorBox}>{errorMessage}</div>}

        <div style={formGrid}>
          <input
            type="text"
            name="id"
            placeholder="Event ID (EVT-101)"
            value={formData.id}
            onChange={handleChange}
            style={inputBase}
          />
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={formData.title}
            onChange={handleChange}
            style={inputBase}
          />
          <input
            type="text"
            name="club"
            placeholder="Club Name"
            value={formData.club}
            onChange={handleChange}
            style={inputBase}
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            style={inputBase}
          />
          <input
            type="text"
            name="venue"
            placeholder="Venue"
            value={formData.venue}
            onChange={handleChange}
            style={inputBase}
          />
          <input
            type="number"
            name="capacity"
            placeholder="Capacity"
            min="1"
            step="1"
            value={formData.capacity}
            onChange={handleChange}
            style={inputBase}
          />
          <textarea
            name="description"
            placeholder="Event Description"
            value={formData.description}
            onChange={handleChange}
            style={textareaBase}
          />
        </div>

        <div style={buttonRow}>
          <button type="submit" style={primaryButton}>
            {isEditing ? 'Update Event' : 'Add Event'}
          </button>
          <button type="button" onClick={clearForm} style={secondaryButton}>
            Clear
          </button>
        </div>
      </form>

      <div style={{ marginTop: '28px' }}>
        <h3 style={{ ...sectionTitle, marginTop: 0 }}>Events List</h3>
        <p style={{ ...helperText, marginTop: 0 }}>
          Changes are now saved in your browser, so they stay there when you move between pages.
        </p>

        {events.length === 0 ? (
          <div style={emptyState}>No events available yet.</div>
        ) : (
          <div style={styles.cardList}>
            {events.map((event) => (
              <div key={event.id} style={styles.itemCard}>
                <div style={styles.badge}>Event Record</div>
                <h4 style={styles.cardTitle}>{event.title}</h4>
                <p><strong>Event ID:</strong> {event.id}</p>
                <p><strong>Club Name:</strong> {event.club}</p>
                <p><strong>Date:</strong> {event.date}</p>
                <p><strong>Venue:</strong> {event.venue}</p>
                <p><strong>Capacity:</strong> {event.capacity}</p>
                <p><strong>Description:</strong> {event.description}</p>

                <div style={buttonRow}>
                  <button onClick={() => handleEditEvent(event)} style={editButton}>
                    Edit
                  </button>
                  <button onClick={() => handleDeleteEvent(event.id)} style={deleteButton}>
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

export default Events;
