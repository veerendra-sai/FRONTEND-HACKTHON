import { useState } from "react";

export default function Login({ login }) {
  const [id, setId] = useState("");
  const [role, setRole] = useState("Student");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!login(id, role)) {
      setError("Invalid ID. Please check your credentials.");
    }
  }

  return (
    <div className="login-page">

      <form className="login-card" onSubmit={handleSubmit}>

        <h1>🎓 CampusTrack</h1>

        <p>Student Report Management System</p>

        <label>Login Role</label>

        <select
          value={role}
          onChange={e => setRole(e.target.value)}
        >
          <option>Student</option>
          <option>Teacher</option>
          <option>Admin</option>
        </select>

        <label>Institution ID</label>

        <input
          value={id}
          onChange={e => setId(e.target.value)}
          placeholder="Enter your ID"
          required
        />

        {error && <p className="error">{error}</p>}

        <button className="primary-btn">
          Login
        </button>

        <div className="demo">
          <b>Demo Login Details</b>
          <p>Admin: ADMIN001</p>
          <p>Teacher: TCH001 – TCH010</p>
          <p>Student: STU001 – STU030</p>
        </div>

      </form>

    </div>
  );
}