import { NavLink } from "react-router-dom";

export default function Sidebar({ logout, user }) {
  const links = [
    ["/", "🏠 Dashboard"],
    ["/students", "🎓 Students"],
    ["/performance", "📚 Performance"],
    ["/reports", "📄 Reports"],
    ["/analytics", "📊 Analytics"]
  ];

  return (
    <aside className="sidebar">

      <h2>🎓 CampusTrack</h2>

      <div className="user">
        <h4>{user.id}</h4>
        <p>{user.role}</p>
      </div>

      <nav>
        {links.map(([path, name]) => (
          <NavLink
            key={path}
            to={path}
            end={path === "/"}
          >
            {name}
          </NavLink>
        ))}
      </nav>

      <button className="logout" onClick={logout}>
        Logout
      </button>

    </aside>
  );
}