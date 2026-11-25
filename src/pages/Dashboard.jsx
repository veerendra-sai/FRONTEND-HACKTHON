import { getData } from "../data";

export default function Dashboard({ user }) {
  const students = getData("students");
  const marks = getData("marks");
  const attendance = getData("attendance");

  const isStudent = user.role === "Student";

  const myMarks = marks.filter(
    m => m.studentId === user.id
  );

  const displayedMarks = isStudent ? myMarks : marks;

  const average = displayedMarks.length
    ? Math.round(
        displayedMarks.reduce(
          (sum, m) =>
            sum + (m.marks / m.maxMarks) * 100,
          0
        ) / displayedMarks.length
      )
    : 0;

  return (
    <div className="page">

      <h1>Welcome, {user.role}! 👋</h1>

      <p>Here is your academic overview.</p>

      <div className="stats-grid">

        {!isStudent && (
          <div className="stat-card blue">
            <h2>{students.length}</h2>
            <p>Total Students</p>
          </div>
        )}

        <div className="stat-card green">
          <h2>{average}%</h2>
          <p>Average Performance</p>
        </div>

        {!isStudent && (
          <div className="stat-card orange">
            <h2>{attendance.length}</h2>
            <p>Attendance Records</p>
          </div>
        )}

        <div className="stat-card purple">
          <h2>{displayedMarks.length}</h2>
          <p>Assessment Records</p>
        </div>

      </div>

      <div className="dashboard-panel">

        <h2>About CampusTrack</h2>

        <p>
          CampusTrack helps educational institutions
          manage student academic performance,
          attendance and progress reports.
        </p>

      </div>

      <div className="dashboard-panel">

        <h2>Recent Marks</h2>

        {displayedMarks.slice(-5).reverse().map(m => (
          <div className="record" key={m.id}>
            <span>{m.studentId} - {m.subject}</span>
            <b>{m.marks}/{m.maxMarks}</b>
          </div>
        ))}

        {!displayedMarks.length && (
          <p>No marks have been entered.</p>
        )}

      </div>

    </div>
  );
}