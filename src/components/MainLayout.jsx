// src/components/MainLayout.jsx
import React, { useState, useEffect, useRef } from "react";
import { useLocation, Outlet } from "react-router-dom";
import Sidebar from "./layout/Sidebar";
import Header from "./layout/Header"; // Assuming Header is the enhanced version
import TopNav from "./layout/TopNav";
import "bootstrap/dist/css/bootstrap.min.css";

function MainLayout() {
  const location = useLocation();
  const searchRef = useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // --- START: Added for controlled search input ---
  const [searchTerm, setSearchTerm] = useState(""); // State for the search text

  const handleSearchChange = (newTerm) => {
    setSearchTerm(newTerm);
    // You can add other logic here if needed, e.g., triggering search results
    console.log("Search term in MainLayout:", newTerm);
  };
  // --- END: Added for controlled search input ---

  const sidebarRef = useRef(null);
  const toggleButtonRef = useRef(null);

  const toggleSidebar = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const isPlainPage = ["/setup", "/compose", "/finalize"].includes(
    location.pathname
  );

  // Effect for Alt+K shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.altKey && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (searchRef.current) {
          searchRef.current.focus();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }
    const handleClickOutside = (event) => {
      const currentSidebarNode = sidebarRef.current;
      const currentToggleButtonNode = toggleButtonRef.current;
      if (
        currentToggleButtonNode &&
        currentToggleButtonNode.contains(event.target)
      ) {
        return;
      }
      if (currentSidebarNode && currentSidebarNode.contains(event.target)) {
        return;
      }
      setIsMobileMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  if (isPlainPage) {
    return <Outlet />;
  }

  return (
    <div
      className="container-fluid p-0 d-flex flex-column"
      style={{ height: "100vh" }}
    >
      <Header
        searchRef={searchRef}
        toggleSidebar={toggleSidebar}
        toggleButtonRef={toggleButtonRef}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
      />
      <div className="row g-0 flex-grow-1" style={{ overflow: "hidden" }}>
        <Sidebar
          ref={sidebarRef}
          isMobileMenuOpen={isMobileMenuOpen}
        />
        <div
          className="col d-flex flex-column"
          style={{ minWidth: 0, overflow: "hidden" }}
        >
          <TopNav />
          <div className="p-4 flex-grow-1" style={{ overflowY: "auto" }}>
            <div className="alert alert-info mb-4">
              Go to the Documents.
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
