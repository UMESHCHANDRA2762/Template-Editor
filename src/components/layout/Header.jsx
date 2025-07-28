import React, { useState, useEffect, useCallback, useRef } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
// Make sure to create and import your CSS file
import "./Header.css"; 

function Header({
  searchRef,
  toggleSidebar,
  toggleButtonRef,
  searchTerm,
  onSearchChange,
  onQuickLaunchClick,
  onSettingsClick,
  onHelpClick,
  onUserAvatarClick,
}) {
  const [isMobileSearchVisible, setIsMobileSearchVisible] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.altKey && (event.key === "k" || event.key === "K")) {
        event.preventDefault();
        if (searchRef.current) {
          searchRef.current.focus();
          if (window.innerWidth < 768 && !isMobileSearchVisible) {
            setIsMobileSearchVisible(true);
          }
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [searchRef, isMobileSearchVisible]);

  useEffect(() => {
    if (isMobileSearchVisible && window.innerWidth < 768 && searchRef.current) {
      searchRef.current.focus();
    }
  }, [isMobileSearchVisible, searchRef]);

  const handleClearSearch = () => {
    if (onSearchChange) {
      onSearchChange("");
    }
    if (searchRef.current) {
      searchRef.current.focus();
    }
  };

  const handleIconKeyPress = useCallback((handler) => (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (handler) {
        handler();
      }
    }
  }, []);

  const handleMobileSearchIconClick = () => {
    setIsMobileSearchVisible(true);
  };

  const handleMobileCloseSearchClick = () => {
    setIsMobileSearchVisible(false);
  };

  return (
    <header
      className="text-white pt-3 pt-md-0"
      style={{
        backgroundColor: "#4B0082",
        paddingBottom: "0px",
      }}
    >
      <div className="container-fluid ps-md-3"> {/* Added ps-md-3 for left padding on medium+ screens */}
        <div className="row align-items-center gy-2 gy-md-0">
          {/* Column 1: Logo/Title */}
          <div
            className="col-12 col-md-5 col-lg-4 d-flex align-items-center justify-content-between px-3 px-md-0" 
          >
            {/* Inner group for logo and title to keep them together */}
            <div className="d-flex align-items-center" style={{ gap: "0.5rem" }}>
              <div className="logo-shape-container">
                <img
                  src="/keka.png" // Ensure this path is correct
                  alt="Keka Logo"
                  className="header-logo" 
                />
              </div>
              <h1
                className="m-0 text-start"
                style={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                }}
              >
                SYSTECHCORP PVT. LTD.
              </h1>
            </div>

            {/* Sidebar Toggle Button */}
            {typeof toggleSidebar === "function" && (
              <button
                ref={toggleButtonRef}
                className="btn btn-link d-md-none p-0" 
                type="button"
                onClick={toggleSidebar}
                aria-label="Toggle sidebar"
                style={{
                  color: "white",
                  lineHeight: 1,
                  fontSize: "1.8rem",
                }}
              >
                <i className="bi bi-list"></i>
              </button>
            )}
          </div>

          {/* Column 2: Search Bar Column */}
          <div className="col-12 px-4 pe-md-2 col-md-4 col-lg-5 mb-2 mb-md-0 d-flex justify-content-center align-items-center">
            <div
              className={`position-relative ${isMobileSearchVisible ? 'd-flex' : 'd-none'} d-md-block align-items-center`}
              style={{
                maxWidth: "600px",
                width: "95%",
              }}
            >
              <i
                className="bi bi-search position-absolute"
                style={{
                  left: "16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#888",
                  fontSize: "1rem",
                  zIndex: 1,
                }}
              ></i>
              <input
                ref={searchRef}
                type="text"
                className={`form-control rounded-pill ps-5 ${isMobileSearchVisible && window.innerWidth < 768 ? 'pe-5' : 'pe-5'}`}
                placeholder="Search employees or actions"
                value={searchTerm !== undefined ? searchTerm : ""}
                onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
                style={{
                  width: "100%",
                  paddingLeft: "3.5rem",
                  paddingRight: searchTerm ? (isMobileSearchVisible && window.innerWidth < 768 ? "3.5rem" : "3.5rem") : (isMobileSearchVisible && window.innerWidth < 768 ? "3.5rem" : "70px"),
                }}
                aria-label="Search employees or actions"
              />
              {searchTerm && onSearchChange && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="btn btn-link position-absolute p-0"
                  aria-label="Clear search text"
                  style={{
                    right: (isMobileSearchVisible && window.innerWidth < 768) ? "40px" : "70px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#888",
                    fontSize: "1rem",
                    lineHeight: 1,
                    zIndex: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "25px",
                    height: "25px",
                  }}
                >
                  <i className="bi bi-x-lg"></i>
                </button>
              )}
              {isMobileSearchVisible && (
                  <button
                    type="button"
                    onClick={handleMobileCloseSearchClick}
                    className="btn btn-link position-absolute p-0 d-md-none"
                    aria-label="Close search bar"
                    style={{
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#888",
                      fontSize: "1.2rem",
                      lineHeight: 1,
                      zIndex: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "25px",
                      height: "25px",
                    }}
                  >
                    <i className="bi bi-x-lg"></i>
                  </button>
              )}
              <button
                className="position-absolute d-none d-md-block"
                style={{
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  backgroundColor: "#f1f1f1",
                  border: "1px solid #ccc",
                  borderRadius: "6px",
                  padding: "3px 8px",
                  fontSize: "0.75rem",
                  lineHeight: 1.2,
                  color: "#333",
                  cursor: "pointer",
                  zIndex: 2,
                }}
                title="Shortcut: Alt+K"
                onClick={() => searchRef.current && searchRef.current.focus()}
                aria-label="Focus search bar (Alt+K)"
              >
                Alt+K
              </button>
            </div>
          </div>

          {/* Column 3: Icons Column */}
          <div className="col-md-3 col-lg-3 mb-3 mb-md-0">
            <div
              className="d-flex align-items-center justify-content-evenly"
              style={{ fontSize: "1.3rem", gap: "0.5rem" }}
            >
              {!isMobileSearchVisible && (
                <i
                  className="bi bi-search d-md-none text-white"
                  style={{ cursor: "pointer", fontSize: "1.3rem" }}
                  title="Search"
                  onClick={handleMobileSearchIconClick}
                  onKeyDown={handleIconKeyPress(handleMobileSearchIconClick)}
                  role="button"
                  tabIndex="0"
                  aria-label="Open search"
                ></i>
              )}
              <i
                className="bi bi-rocket-takeoff"
                style={{ cursor: "pointer" }}
                title="Quick Launch"
                onClick={onQuickLaunchClick}
                onKeyDown={handleIconKeyPress(onQuickLaunchClick)}
                role="button"
                tabIndex="0"
                aria-label="Quick Launch"
              ></i>
              <i
                className="bi bi-gear"
                style={{ cursor: "pointer" }}
                title="Settings"
                onClick={onSettingsClick}
                onKeyDown={handleIconKeyPress(onSettingsClick)}
                role="button"
                tabIndex="0"
                aria-label="Settings"
              ></i>
              <i
                className="bi bi-question-circle"
                style={{ cursor: "pointer" }}
                title="Help"
                onClick={onHelpClick}
                onKeyDown={handleIconKeyPress(onHelpClick)}
                role="button"
                tabIndex="0"
                aria-label="Help"
              ></i>
              <div
                style={{
                  width: "35px",
                  height: "35px",
                  borderRadius: "50%",
                  backgroundColor: "#FFAA33",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  color: "#4B0082",
                  fontSize: "0.9rem",
                  cursor: "pointer",
                  border: "1px solid #fff",
                  flexShrink: 0,
                }}
                title="Umesh Chandra"
                onClick={onUserAvatarClick}
                onKeyDown={handleIconKeyPress(onUserAvatarClick)}
                role="button"
                tabIndex="0"
                aria-label="User Profile"
              >
                UC
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
