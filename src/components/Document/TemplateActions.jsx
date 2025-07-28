import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";

const TemplateActions = ({
  template,
  onEdit,
  onDelete,
  onView,
  isMobileView,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const triggerButtonRef = useRef(null);

  const [dropdownStyle, setDropdownStyle] = useState({
    position: "absolute",
    top: "0px",
    left: "0px",
    minWidth: "160px",
    zIndex: 1060,
  });

  const handleAction = (action) => {
    switch (action) {
      case "view":
        onView(template);
        break;
      case "edit":
        onEdit(template);
        break;
      case "delete":
        if (
          window.confirm(
            `Are you sure you want to delete "${template.documentName}"?`
          )
        ) {
          onDelete(template.id);
        }
        break;
      default:
        break;
    }
    setShowOptions(false);
  };

  useEffect(() => {
    if (showOptions && triggerButtonRef.current) {
      const buttonRect = triggerButtonRef.current.getBoundingClientRect();
      const menuMinWidth = 160;

      let top = buttonRect.bottom + window.scrollY + 2;
      let left = buttonRect.right + window.scrollX - menuMinWidth;

      if (left + menuMinWidth > window.innerWidth - 10) {
        left = window.innerWidth - menuMinWidth - 10;
      }
      if (left < 10) {
        left = 10;
      }

      const estimatedMenuHeight = 130;
      if (
        top + estimatedMenuHeight >
        window.innerHeight + window.scrollY - 10
      ) {
        top = buttonRect.top + window.scrollY - estimatedMenuHeight - 2;
      }
      if (top < window.scrollY + 10) {
        top = window.scrollY + 10;
      }

      setDropdownStyle((prev) => ({
        ...prev,
        top: `${top}px`,
        left: `${left}px`,
        minWidth: `${menuMinWidth}px`,
      }));
    }
  }, [showOptions]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showOptions &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        triggerButtonRef.current &&
        !triggerButtonRef.current.contains(event.target)
      ) {
        setShowOptions(false);
      }
    };

    if (showOptions) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showOptions]);

  let containerClasses = `d-flex gap-2`;
  if (isMobileView) {
    containerClasses += ` flex-column align-items-stretch w-100`;
  } else {
    // For desktop, the parent div in TemplateList also has align-items-center.
    // This ensures these buttons are centered within their allocated space.
    containerClasses += ` align-items-center justify-content-start flex-nowrap`; // Updated here to justify to the left
  }

  const generateButtonClasses = `btn btn-sm ${
    isMobileView ? "btn-primary" : "btn-outline-primary"
  }`;

  const threeDotsButtonWrapperClasses = isMobileView ? "align-self-end" : "";

  const DropdownMenu = (
    <div
      ref={menuRef}
      className="dropdown-menu shadow-sm"
      style={{ ...dropdownStyle, display: "block" }}
    >
      <button className="dropdown-item" onClick={() => handleAction("view")}>
        <i className="bi bi-eye me-2"></i>View
      </button>
      <button className="dropdown-item" onClick={() => handleAction("edit")}>
        <i className="bi bi-pencil-square me-2"></i>Edit
      </button>
      <button
        className="dropdown-item text-danger"
        onClick={() => handleAction("delete")}
      >
        <i className="bi bi-trash me-2"></i>Delete
      </button>
    </div>
  );

  return (
    <div
      className={containerClasses}
      style={{ minWidth: isMobileView ? "auto" : "130px" }}
    >
      {/* Adjusting margin-left for desktop to move the button slightly left */}
      <button
        className={generateButtonClasses}
        onClick={() =>
          navigate("/finalize", { state: { content: template.content } })
        }
        style={{ marginLeft: isMobileView ? "0" : "-10px" }} // Moves the button left
      >
        Generate
      </button>

      {/* This div wrapper helps with mobile's align-self-end and keeps structure consistent */}
      <div className={threeDotsButtonWrapperClasses}>
        <button
          ref={triggerButtonRef}
          // Applied btn and btn-sm for consistent Bootstrap sizing behavior
          className="btn btn-sm"
          style={{
            background: "transparent",
            border: "none",
            fontSize: "20px", // Icon size
            color: isMobileView ? "#0d6efd" : "#6c757d",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingLeft: "0.35rem",
            paddingRight: "0.35rem",
          }}
          onClick={() => setShowOptions(!showOptions)}
          aria-haspopup="true"
          aria-expanded={showOptions}
          aria-label="More actions"
        >
          &#x22EE;
        </button>
      </div>

      {showOptions && ReactDOM.createPortal(DropdownMenu, document.body)}
    </div>
  );
};

export default TemplateActions;
