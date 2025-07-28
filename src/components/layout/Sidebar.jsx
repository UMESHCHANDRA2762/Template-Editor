// src/components/layout/Sidebar.js
import React, { forwardRef } from "react"; // Import forwardRef
import { MdHome } from "react-icons/md";
import { RiTeamFill } from "react-icons/ri";
import { IoApps } from "react-icons/io5";
import "./Sidebar.css";

const sidebarItems = [
  { icon: <MdHome />, label: "Home" },
  { icon: <i className="bi bi-person"></i>, label: "Me" },
  { icon: <i className="bi bi-inbox"></i>, label: "Inbox" },
  { icon: <RiTeamFill />, label: "My Team" },
  { icon: <i className="bi bi-coin"></i>, label: "My Finances" },
  { icon: <i className="bi bi-building-fill"></i>, label: "Org" },
  { icon: <i className="bi bi-graph-up-arrow"></i>, label: "Performance" },
  { icon: <i className="bi bi-journal-text"></i>, label: "Projects" },
  { icon: <i className="bi bi-alarm"></i>, label: "Time Attend" },
  { icon: <i className="bi bi-tv"></i>, label: "Payroll" },
  { icon: <i className="bi bi-mortarboard-fill"></i>, label: "Learn" },
  { icon: <IoApps />, label: "Apps" },
];

// Wrap component with forwardRef to accept a ref from the parent
const Sidebar = forwardRef(({ isMobileMenuOpen }, ref) => {
  return (
    <div
      ref={ref} // Attach the forwarded ref to the root div
      className={`col-auto custom-sidebar d-md-flex ${
        isMobileMenuOpen ? "custom-sidebar-mobile-open" : ""
      }`}
      style={{ width: "145px", flexShrink: 0 }}
    >
      <div className="custom-sidebar-scrollable-content">
        {sidebarItems.map((item, index) => (
          <div
            key={index}
            className="custom-sidebar-item"
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            <div className="custom-sidebar-item-icon">{item.icon}</div>
            <div className="custom-sidebar-item-label">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default Sidebar;
