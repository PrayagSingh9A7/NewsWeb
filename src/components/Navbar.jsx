import { NavLink } from "react-router-dom";
import { categories } from "../utils/categories.js";

function Navbar({ isDarkMode, onToggleDarkMode }) {
  return (
    <nav className="navbar navbar-expand-lg sticky-top shadow-sm app-navbar">
      <div className="container">
        <NavLink className="navbar-brand fw-bold" to="/">
          NewsWeb
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-lg-1">
            {categories.map((category) => (
              <li className="nav-item" key={category.slug}>
                <NavLink
                  className={({ isActive }) =>
                    `nav-link rounded-pill px-3 ${isActive ? "active" : ""}`
                  }
                  to={category.path}
                >
                  {category.label}
                </NavLink>
              </li>
            ))}

            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link rounded-pill px-3 ${isActive ? "active" : ""}`
                }
                to="/saved"
              >
                Saved
              </NavLink>
            </li>
          </ul>

          <button
            className="btn btn-outline-primary theme-toggle"
            type="button"
            onClick={onToggleDarkMode}
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
