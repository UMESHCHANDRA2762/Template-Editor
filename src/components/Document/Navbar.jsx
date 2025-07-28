import React from "react";

const Navbar = ({ navItems, active, setActive }) => {
  return (
    <nav
      className="d-flex"
      style={{ backgroundColor: "white", padding: "0.5rem 0" }}
    >
      {navItems.map((item) => (
        <div
          key={item}
          onClick={() => setActive(item)}
          style={{
            marginRight: "2rem",
            cursor: "pointer",
            paddingBottom: "0.5rem",
            borderBottom:
              active === item ? "2px solid #4B0082" : "2px solid transparent",
            color: active === item ? "#4B0082" : "#333",
            fontWeight: active === item ? 600 : 400,
          }}
        >
          {item}
        </div>
      ))}
    </nav>
  );
};

export default Navbar;
