import { Link, useLocation } from "react-router-dom";
import "./TopNav.css"
const TopNav = () => {
  const location = useLocation();

  const topNavItems = [
    { label: "DASHBOARD", path: "/dashboard" },
    { label: "EMPLOYEES", path: "#" },
    { label: "ORG STRUCTURE", path: "#" },
    { label: "ONBOARDING", path: "#" },
    { label: "EXITS", path: "#" },
    { label: "EXPENSES & TRAVEL", path: "#" },
    { label: "DOCUMENTS", path: "/documents" },
    { label: "ENGAGE", path: "#" },
    { label: "ASSETS", path: "#" },
    { label: "HELPDESK", path: "#" },
    { label: "SETTINGS", path: "#" },
  ];

  return (
    <nav
      className="d-flex align-items-center px-3 overflow-auto"
      style={{
        backgroundColor: "#fff",
        height: "40px",
        gap: "1rem",
        fontSize: "0.85rem",
        fontWeight: "500",
        whiteSpace: "nowrap",
      }}
    >
      {topNavItems.map((item, idx) => {
        const isActive = location.pathname === item.path;

        return (
          <Link
            key={idx}
            to={item.path}
            style={{
              textDecoration: "none",
              color: isActive ? "#4B0082" : "#333",
              borderBottom: isActive
                ? "2px solid #4B0082"
                : "2px solid transparent",
              paddingBottom: "2px",
              transition: "color 0.2s, border-bottom 0.2s",
            }}
            onMouseEnter={(e) => {
              if (!isActive) e.currentTarget.style.color = "#4B0082";
            }}
            onMouseLeave={(e) => {
              if (!isActive) e.currentTarget.style.color = "#333";
            }}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
};

export default TopNav;
