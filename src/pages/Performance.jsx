import { useState } from "react";
import { getData, saveData } from "../data";
import { useLocation } from "react-router-dom";

export default function Performance() {
  const students = getData("students");

  const [marks, setMarks] = useState(getData("marks"));
  const [attendance, setAttendance] = useState(
    getData("attendance")
  );

  const [form, setForm] = useState({
    studentId: "STU001",
    subject: "",
    marks: "",
    maxMarks: "100",
    remark: ""
  });

  const [date, setDate] = useState(
    new Date().toISOString().slice(0, 10)
  );

  const [attendanceStatus, setAttendanceStatus] = useState({});

  function addMarks(e) {
    e.preventDefault();

    const obtained = Number(form.marks);
    const maximum = Number(form.maxMarks);

    if (
      !Number.isFinite(obtained) ||
      !Number.isFinite(maximum) ||
      maximum <= 0 ||
      obtained < 0 ||
      obtained > maximum
    ) {
      alert("Please enter valid marks.");
      return;
    }

    const updated = [
      ...marks,
      {
        ...form,
        id: Date.now(),
        marks: obtained,
        maxMarks: maximum
      }
    ];

    setMarks(updated);
    saveData("marks", updated);

    alert("Marks added successfully!");

    setForm({
      ...form,
      subject: "",
      marks: "",
      remark: ""
    });
  }

  function saveAttendance() {
    const entries = Object.entries(attendanceStatus);

    if (!entries.length) {
      alert("Select attendance status first.");
      return;
    }

    const updated = [
      ...attendance,
      ...entries.map(([studentId, status], index) => ({
        id: Date.now() + index,
        studentId,
        date,
        status
      }))
    ];

    setAttendance(updated);
    saveData("attendance", updated);

    setAttendanceStatus({});

    alert("Attendance saved!");
  }

  return (
    <div className="page">

      <h1>Performance Management</h1>
      <p>Manage marks, remarks and attendance.</p>

      <div className="dashboard-panel">

        <h2>Enter Student Marks</h2>

        <form className="form-grid" onSubmit={addMarks}>

          <select
            value={form.studentId}
            onChange={e =>
              setForm({...form, studentId: e.target.value})
            }
          >
            {students.map(s => (
              <option key={s.id} value={s.id}>
                {s.id} - {s.name}
              </option>
            ))}
          </select>

          <input
            placeholder="Subject"
            required
            value={form.subject}
            onChange={e =>
              setForm({...form, subject: e.target.value})
            }
          />

          <input
            type="number"
            placeholder="Marks obtained"
            min="0"
            required
            value={form.marks}
            onChange={e =>
              setForm({...form, marks: e.target.value})
            }
          />

          <input
            type="number"
            placeholder="Maximum marks"
            min="1"
            required
            value={form.maxMarks}
            onChange={e =>
              setForm({...form, maxMarks: e.target.value})
            }
          />

          <input
            placeholder="Teacher Remarks"
            value={form.remark}
            onChange={e =>
              setForm({...form, remark: e.target.value})
            }
          />

          <button className="primary-btn">
            Save Marks
          </button>

        </form>

      </div>

      <div className="dashboard-panel">

        <h2>Attendance Management</h2>

        <label>Select Date</label>

        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
        />

        <div className="table-container">

          <table>
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Name</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {students.map(s => (
                <tr key={s.id}>
                  <td>{s.id}</td>
                  <td>{s.name}</td>

                  <td>
                    <select
                      value={attendanceStatus[s.id] || ""}
                      onChange={e =>
                        setAttendanceStatus({
                          ...attendanceStatus,
                          [s.id]: e.target.value
                        })
                      }
                    >
                      <option value="">Select</option>
                      <option value="Present">Present</option>
                      <option value="Absent">Absent</option>
                      <option value="Late">Late</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>

        <button
          className="primary-btn"
          onClick={saveAttendance}
        >
          Save Attendance
        </button>

      </div>

      <div className="dashboard-panel">

        <h2>Recent Marks</h2>

        {marks.slice(-5).reverse().map(m => (
          <div className="record" key={m.id}>
            <span>{m.studentId} - {m.subject}</span>
            <b>{m.marks}/{m.maxMarks}</b>
          </div>
        ))}

      </div>

    </div>
  );
}