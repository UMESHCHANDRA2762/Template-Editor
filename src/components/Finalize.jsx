import React from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import RightSidebar from "../components/RightSidebar";
import "./Finalize.css";

const Finalize = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    content = "<p>No content passed.</p>",
    documentName = localStorage.getItem("docName") || "Untitled Document",
    folder = localStorage.getItem("folder") || "General",
    actionType = localStorage.getItem("actionType") || "View",
  } = location.state || {};

  const handleSaveTemplate = () => {
    let cleanedContent = content;
    if (cleanedContent.startsWith("<p>") && cleanedContent.endsWith("</p>")) {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = cleanedContent;
      if (
        tempDiv.childNodes.length === 1 &&
        tempDiv.firstChild.nodeName === "P"
      ) {
        cleanedContent = tempDiv.firstChild.innerHTML;
      }
    }

    const newTemplate = {
      id: Date.now(),
      documentName,
      folder,
      actionType,
      lastUsed: new Date().toLocaleDateString(),
      content: cleanedContent,
    };

    const existingTemplates =
      JSON.parse(localStorage.getItem("templates")) || [];
    const updatedTemplates = [...existingTemplates, newTemplate];

    localStorage.setItem("templates", JSON.stringify(updatedTemplates));
    navigate("/documents");
  };

  return (
    <div
      className="finalize-page-container"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <div className="finalize-header-bar bg-white text-black p-4 border-bottom mb-4 shadow-sm">
        <h1 className="fs-3 fw-bold m-0 text-black-900">Document Template</h1>
      </div>

      <div className="finalize-stepper-actions-bar d-flex justify-content-between align-items-center py-3 px-4 bg-white rounded shadow-sm mb-4">
        <div className="finalize-stepper-container d-flex justify-content-center gap-4 flex-grow-1">
          {["Setup", "Compose", "Finalize"].map((label, index) => {
            const isActive = label === "Finalize";
            return (
              <button
                key={label}
                className="finalize-stepper-button btn d-flex align-items-center gap-2 text-uppercase fw-semibold"
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  color: isActive ? "#6f42c1" : "#888",
                }}
              >
                <span
                  className="finalize-stepper-number d-flex justify-content-center align-items-center"
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    backgroundColor: isActive ? "#6f42c1" : "#fff",
                    color: isActive ? "#fff" : "#6f42c1",
                    fontSize: "14px",
                    fontWeight: "bold",
                    border: "2px solid #6f42c1",
                  }}
                >
                  {index + 1}
                </span>
                <span
                  className="finalize-stepper-label"
                  style={{ fontSize: "14px" }}
                >
                  {label}
                </span>
              </button>
            );
          })}
        </div>

        <div className="finalize-action-buttons d-flex gap-3">
          <Link to="/compose">
            <button className="btn btn-outline-secondary fw-semibold px-4">
              Back
            </button>
          </Link>
          <button
            className="btn fw-semibold px-4"
            style={{
              backgroundColor: "#6f42c1",
              color: "#fff",
              border: "none",
            }}
            onClick={handleSaveTemplate}
          >
            Save Template
          </button>
        </div>
      </div>

      <div className="finalize-main-content d-flex">
        <div className="finalize-document-preview-wrapper flex-grow-1 d-flex justify-content-center align-items-start">
          <div
            className="finalize-document-a4"
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>
        </div>

        <div className="right-sidebar-container">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
};

export default Finalize;
