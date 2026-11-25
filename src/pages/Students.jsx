import { useState } from "react";
import { getData, saveData } from "../data";

export default function Students() {
  const [students, setStudents] = useState(
    getData("students")
  );

  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    id: "",
    name: "",
    department: "CSE",
    year: "1",
    email: ""
  });

  function addStudent(e) {
    e.preventDefault();

    const id = form.id.trim().toUpperCase();

    if (students.some(s => s.id === id)) {
      alert("Student ID already exists!");
      return;
    }

    const updated = [
      ...students,
      {
        ...form,
        id,
        attendance: 0
      }
    ];

    setStudents(updated);
    saveData("students", updated);

    setForm({
      id: "",
      name: "",
      department: "CSE",
      year: "1",
      email: ""
    });

    alert("Student added successfully!");
  }

  const filtered = students.filter(s =>
    `${s.name} ${s.id} ${s.department}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="page">

      <h1>Student Management</h1>
      <p>Add and manage student details.</p>

      <div className="dashboard-panel">

        <h2>Add New Student</h2>

        <form className="form-grid" onSubmit={addStudent}>

          <input
            placeholder="Student ID"
            required
            value={form.id}
            onChange={e =>
              setForm({...form, id: e.target.value})
            }
          />

          <input
            placeholder="Student Name"
            required
            value={form.name}
            onChange={e =>
              setForm({...form, name: e.target.value})
            }
          />

          <select
            value={form.department}
            onChange={e =>
              setForm({...form, department: e.target.value})
            }
          >
            <option>CSE</option>
            <option>ECE</option>
            <option>IT</option>
            <option>EEE</option>
          </select>

          <select
            value={form.year}
            onChange={e =>
              setForm({...form, year: e.target.value})
            }
          >
            <option value="1">Year 1</option>
            <option value="2">Year 2</option>
            <option value="3">Year 3</option>
            <option value="4">Year 4</option>
          </select>

          <input
            type="email"
            placeholder="Email"
            required
            value={form.email}
            onChange={e =>
              setForm({...form, email: e.target.value})
            }
          />

          <button className="primary-btn">
            Add Student
          </button>

        </form>

      </div>

      <div className="dashboard-panel">

        <h2>Student List ({students.length})</h2>

        <input
          placeholder="Search students..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <div className="table-container">

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Department</th>
                <th>Year</th>
                <th>Attendance</th>
                <th>Email</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map(s => (
                <tr key={s.id}>
                  <td>{s.id}</td>
                  <td>{s.name}</td>
                  <td>{s.department}</td>
                  <td>{s.year}</td>
                  <td>{s.attendance}%</td>
                  <td>{s.email}</td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>

      </div>

    </div>
  );
}