import { useState } from "react";
import { getData } from "../data";

export default function Reports() {
  const students = getData("students");
  const marks = getData("marks");
  const attendance = getData("attendance");

  const [selected, setSelected] = useState("STU001");

  const student = students.find(
    s => s.id === selected
  );

  const studentMarks = marks.filter(
    m => m.studentId === selected
  );

  const studentAttendance = attendance.filter(
    a => a.studentId === selected
  );

  const average = studentMarks.length
    ? Math.round(
        studentMarks.reduce(
          (sum, m) =>
            sum + (m.marks / m.maxMarks) * 100,
          0
        ) / studentMarks.length
      )
    : 0;

  const present = studentAttendance.filter(
    a => a.status === "Present"
  ).length;

  const attendancePercentage = studentAttendance.length
    ? Math.round(
        present / studentAttendance.length * 100
      )
    : student?.attendance || 0;

  return (
    <div className="page">

      <h1>Student Progress Reports</h1>
      <p>View individual academic performance.</p>

      <div className="dashboard-panel">

        <label>Select Student</label>

        <select
          value={selected}
          onChange={e => setSelected(e.target.value)}
        >
          {students.map(s => (
            <option key={s.id} value={s.id}>
              {s.id} - {s.name}
            </option>
          ))}
        </select>

        {student && (
          <div className="report">

            <div className="report-header">
              <h2>Academic Progress Report</h2>
              <p>Academic Year 2026–27</p>
            </div>

            <h3>{student.name}</h3>

            <p>Student ID: {student.id}</p>
            <p>Department: {student.department}</p>
            <p>Year: {student.year}</p>

            <div className="stats-grid">

              <div className="stat-card blue">
                <h2>{average}%</h2>
                <p>Average Marks</p>
              </div>

              <div className="stat-card green">
                <h2>{attendancePercentage}%</h2>
                <p>Attendance</p>
              </div>

              <div className="stat-card purple">
                <h2>{studentMarks.length}</h2>
                <p>Assessments</p>
              </div>

            </div>

            <h3>Subject Details</h3>

            <div className="table-container">

              <table>
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Marks</th>
                    <th>Percentage</th>
                    <th>Remarks</th>
                  </tr>
                </thead>

                <tbody>
                  {studentMarks.map(m => (
                    <tr key={m.id}>
                      <td>{m.subject}</td>
                      <td>{m.marks}/{m.maxMarks}</td>
                      <td>
                        {Math.round(
                          m.marks / m.maxMarks * 100
                        )}%
                      </td>
                      <td>{m.remark || "—"}</td>
                    </tr>
                  ))}
                </tbody>

              </table>

            </div>

            {studentMarks.length === 0 && (
              <p>No marks available.</p>
            )}

            <button
              className="primary-btn no-print"
              onClick={() => window.print()}
            >
              Print Report
            </button>

          </div>
        )}

      </div>

    </div>
  );
}