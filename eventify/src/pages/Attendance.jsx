import { useState } from "react";

function Attendance() {
  const [records, setRecords] = useState([]);

  const [form, setForm] = useState({
    id: "",
    name: "",
    studentId: "",
    event: "",
    status: "Present",
  });

  const handleAdd = () => {
    if (!form.name || !form.studentId || !form.event) return;

    setRecords([...records, form]);

    setForm({
      id: "",
      name: "",
      studentId: "",
      event: "",
      status: "Present",
    });
  };

  const handleDelete = (index) => {
    const updated = records.filter((_, i) => i !== index);
    setRecords(updated);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Attendance Records</h2>

      <input
        placeholder="Record ID"
        value={form.id}
        onChange={(e) => setForm({ ...form, id: e.target.value })}
      />

      <br />

      <input
        placeholder="Student Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <br />

      <input
        placeholder="Student ID"
        value={form.studentId}
        onChange={(e) =>
          setForm({ ...form, studentId: e.target.value })
        }
      />

      <br />

      <input
        placeholder="Event Title"
        value={form.event}
        onChange={(e) => setForm({ ...form, event: e.target.value })}
      />

      <br />

      <select
        value={form.status}
        onChange={(e) => setForm({ ...form, status: e.target.value })}
      >
        <option>Present</option>
        <option>Absent</option>
      </select>

      <br /><br />

      <button onClick={handleAdd}>Add Record</button>

      <hr />

      <ul>
        {records.map((r, index) => (
          <li key={index}>
            {r.name} | {r.event} | {r.status}

            <button
              onClick={() => handleDelete(index)}
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Attendance;