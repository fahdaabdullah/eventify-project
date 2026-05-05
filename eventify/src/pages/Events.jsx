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

const API_URL = 'http://localhost:8080/api/events';

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
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchId, setSearchId] = useState('');
  const [searchedEvent, setSearchedEvent] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }

      const data = await response.json();
      setEvents(data);
    } catch (error) {
      setErrorMessage('Could not load events from the server.');
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
    const { id, title, club, date, venue, capacity, description } = formData;

    if (
      !id.trim() ||
      !title.trim() ||
      !club.trim() ||
      !date.trim() ||
      !venue.trim() ||
      !capacity.toString().trim() ||
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

    if (!/^\d+$/.test(capacity.toString()) || Number(capacity) <= 0) {
      setErrorMessage('Capacity must be a valid positive whole number.');
      return false;
    }

    if (description.trim().length < 15) {
      setErrorMessage('Description should be at least 15 characters long.');
      return false;
    }

    const normalizedId = id.trim().toUpperCase();

    const duplicateId = events.some(
      (event) =>
        event.id.toUpperCase() === normalizedId &&
        event.id !== editingId
    );

    if (duplicateId) {
      setErrorMessage('Event ID must be unique.');
      return false;
    }

    setErrorMessage('');
    return true;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validateForm()) return;

    const normalizedEvent = {
      id: formData.id.trim().toUpperCase(),
      title: formData.title.trim(),
      club: formData.club.trim(),
      date: formData.date,
      venue: formData.venue.trim(),
      capacity: Number(formData.capacity),
      description: formData.description.trim(),
    };

    try {
      const url = isEditing ? `${API_URL}/${editingId}` : API_URL;
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(normalizedEvent),
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      await fetchEvents();
      clearForm();
    } catch (error) {
      setErrorMessage('Could not save the event on the server.');
    }
  }

  function handleEditEvent(event) {
    setFormData({
      ...event,
      capacity: String(event.capacity),
    });
    setIsEditing(true);
    setEditingId(event.id);
    setErrorMessage('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function handleDeleteEvent(id) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Delete failed');
      }

      await fetchEvents();

      if (editingId === id) {
        clearForm();
      }

      if (searchedEvent?.id === id) {
        setSearchedEvent(null);
      }
    } catch (error) {
      setErrorMessage('Could not delete the event from the server.');
    }
  }

  async function handleSearchById(e) {
    e.preventDefault();

    if (!searchId.trim()) {
      setErrorMessage('Please enter an Event ID to search.');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${searchId.trim().toUpperCase()}`);

      if (!response.ok) {
        setSearchedEvent(null);
        setErrorMessage('No event found with this ID.');
        return;
      }

      const data = await response.json();
      setSearchedEvent(data);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Could not search for the event on the server.');
    }
  }

  return (
    <div style={pageShell}>
      <h2 style={sectionTitle}>Events Management</h2>
      <p style={sectionSubtitle}>
        Manage university event records by adding, updating, deleting, searching, and displaying each event clearly.
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
            disabled={isEditing}
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

      <form onSubmit={handleSearchById} style={{ ...card, marginTop: '24px' }}>
        <h3 style={{ ...sectionTitle, marginTop: 0 }}>Search Event by ID</h3>
        <p style={{ ...helperText, marginTop: 0 }}>
          This uses the Spring Boot GET request, for example <strong>/api/events/EVT-101</strong>.
        </p>

        <div style={buttonRow}>
          <input
            type="text"
            placeholder="Enter Event ID, e.g. EVT-101"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            style={inputBase}
          />
          <button type="submit" style={primaryButton}>
            Search
          </button>
        </div>

        {searchedEvent && (
          <div style={{ ...styles.itemCard, marginTop: '16px' }}>
            <div style={styles.badge}>Search Result</div>
            <h4 style={styles.cardTitle}>{searchedEvent.title}</h4>
            <p><strong>Event ID:</strong> {searchedEvent.id}</p>
            <p><strong>Club Name:</strong> {searchedEvent.club}</p>
            <p><strong>Date:</strong> {searchedEvent.date}</p>
            <p><strong>Venue:</strong> {searchedEvent.venue}</p>
            <p><strong>Capacity:</strong> {searchedEvent.capacity}</p>
            <p><strong>Description:</strong> {searchedEvent.description}</p>
          </div>
        )}
      </form>

      <div style={{ marginTop: '28px' }}>
        <h3 style={{ ...sectionTitle, marginTop: 0 }}>Events List</h3>
        <p style={{ ...helperText, marginTop: 0 }}>
          Changes are now saved in the Spring Boot server using an embedded H2 database.
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