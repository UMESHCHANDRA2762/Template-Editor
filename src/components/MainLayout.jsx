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
  // NOTE: The enhanced Header component also has an Alt+K listener.
  // You might want to keep only one (preferably in Header if it always handles its searchRef).
  // For now, this won't stop typing, but it's a redundancy.
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
  }, []); // searchRef itself is stable, so empty dependency array is okay here.

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
  }, [isMobileMenuOpen]); // Removed setIsMobileMenuOpen as it's stable

  if (isPlainPage) {
    return <Outlet />;
  }

  // --- Add click handlers for other Header icons if you plan to use them ---
  // const handleQuickLaunch = () => console.log("Quick Launch from MainLayout");
  // const handleSettings = () => console.log("Settings from MainLayout");
  // const handleHelp = () => console.log("Help from MainLayout");
  // const handleUserAvatar = () => console.log("User Avatar from MainLayout");
  // --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---

  return (
    <div
      className="container-fluid p-0 d-flex flex-column"
      style={{ height: "100vh" }}
    >
      <Header
        searchRef={searchRef}
        toggleSidebar={toggleSidebar}
        toggleButtonRef={toggleButtonRef}
        // --- Pass the new props for search ---
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        // --- --- --- --- --- --- --- --- --- ---

        // --- Optionally pass handlers for other new icon functionalities ---
        // onQuickLaunchClick={handleQuickLaunch}
        // onSettingsClick={handleSettings}
        // onHelpClick={handleHelp}
        // onUserAvatarClick={handleUserAvatar}
        // --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
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
            <Outlet />
            {/* You can display the search term here for debugging if you like */}
            {/* <p>Current search: {searchTerm}</p> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainLayout;