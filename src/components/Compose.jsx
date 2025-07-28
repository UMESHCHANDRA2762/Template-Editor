import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./SideBar";
import RightSidebar from "./RightSidebar";
import StepContent from "./StepContent";
import PreviewModal from "./PreviewModal";
import "react-quill/dist/quill.snow.css";
import "./Compose.css";
import { FaBars, FaTimes } from "react-icons/fa";

const Compose = () => {
  const [activeStep, setActiveStep] = useState("compose");
  const navigate = useNavigate();
  const quillRef = useRef(null);
  const [editorContent, setEditorContent] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [previewContent, setPreviewContent] = useState("");
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);

  useEffect(() => {
    const savedContent = localStorage.getItem("editorContent");
    if (savedContent) {
      setEditorContent(savedContent);
    }
  }, []);

  useEffect(() => {
    if (editorContent && activeStep !== "compose") {
      localStorage.setItem("editorContent", editorContent);
    }
  }, [editorContent, activeStep]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isLeftSidebarOpen &&
        !event.target.closest(".compose-left-sidebar") &&
        !event.target.closest(".sidebar-toggle-button")
      ) {
        setIsLeftSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isLeftSidebarOpen]);

  const handleStepClick = (step) => {
    setActiveStep(step);
    navigate(`/${step.toLowerCase()}`);
  };

  const handleInsertText = (text, isEmployeeText = false) => {
    const editor = quillRef.current?.getEditor();
    if (editor) {
      const range = editor.getSelection(true);
      if (range) {
        const variableText = text.trim();
        const styledText = `<span style="background-color:rgb(222, 247, 255); padding: 2px 5px; border-radius: 4px; display: inline-block; margin: 0 2px;">${variableText}</span>`;
        editor.clipboard.dangerouslyPasteHTML(range.index, styledText);
        const newCursorPos = range.index + styledText.length - "</span>".length;
        editor.setSelection(newCursorPos, 0);
        editor.focus();
      }
    }
  };

  const handleContinueClick = () => {
    navigate("/finalize", { state: { content: editorContent } });
  };

  const handlePreviewClick = () => {
    const mockData = {
      EmployeeNumber: "EMP123",
      FirstName: "John",
      LastName: "Doe",
      JoiningDate: "2023-01-01",
      Designation: "Software Engineer",
      FullName: "John Michael Doe",
    };

    let content = editorContent;
    Object.keys(mockData).forEach((key) => {
      const regex = new RegExp(`(?<!<[^>]*)\\b${key}\\b(?![^<]*>)`, "g");
      content = content.replace(regex, mockData[key]);
    });

    setPreviewContent(content);
    setShowPreview(true);
  };

  const toggleLeftSidebar = () => {
    setIsLeftSidebarOpen(!isLeftSidebarOpen);
  };

  return (
    <div
      className="compose-page-container"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <div className="compose-header-bar bg-white text-black p-4 border-bottom mb-2 shadow-sm">
        <div className="compose-header-content d-flex align-items-center">
          <button
            onClick={toggleLeftSidebar}
            className="sidebar-toggle-button btn btn-link p-0 me-3"
          >
            {isLeftSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
          <h1 className="fs-3 fw-bold m-0 text-black-900">Document Template</h1>
        </div>
      </div>

      <div className="compose-stepper-actions-bar d-flex justify-content-between align-items-center py-3 px-4 bg-white rounded shadow-sm mb-4">
        <div className="compose-stepper-container d-flex justify-content-center gap-4 flex-grow-1">
          {["Setup", "Compose", "Finalize"].map((step, index) => (
            <button
              key={step}
              onClick={() => handleStepClick(step)}
              className="compose-stepper-button btn d-flex align-items-center gap-2 text-uppercase fw-semibold"
              style={{
                backgroundColor: "transparent",
                border: "none",
                color:
                  activeStep.toLowerCase() === step.toLowerCase()
                    ? "#6f42c1"
                    : "#888",
              }}
            >
              <span
                className="compose-stepper-number d-flex justify-content-center align-items-center"
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  backgroundColor:
                    activeStep.toLowerCase() === step.toLowerCase()
                      ? "#6f42c1"
                      : "#fff",
                  color:
                    activeStep.toLowerCase() === step.toLowerCase()
                      ? "#fff"
                      : "#6f42c1",
                  fontSize: "14px",
                  fontWeight: "bold",
                  border: "2px solid #6f42c1",
                }}
              >
                {index + 1}
              </span>
              <span
                className="compose-stepper-label"
                style={{ fontSize: "14px" }}
              >
                {step}
              </span>
            </button>
          ))}
        </div>

        <div className="compose-action-buttons d-flex gap-3 flex-wrap justify-content-end">
          <button
            className="btn btn-outline-secondary fw-semibold px-4"
            onClick={() => handleStepClick("Setup")}
          >
            Cancel
          </button>
          <button
            onClick={handlePreviewClick}
            className="btn fw-semibold px-4"
            style={{
              backgroundColor: "#6f42c1",
              color: "#fff",
              border: "none",
            }}
          >
            Preview
          </button>
          <button
            className="btn fw-semibold px-4"
            style={{
              backgroundColor: "#6f42c1",
              color: "#fff",
              border: "none",
            }}
            onClick={handleContinueClick}
          >
            Continue
          </button>
        </div>
      </div>

      <div className="compose-main-layout d-flex flex-grow-1">
        <div
          className={`compose-left-sidebar ${
            isLeftSidebarOpen ? "open" : "closed"
          }`}
        >
          <Sidebar onInsertText={handleInsertText} />
        </div>

        <div className="compose-content-right-wrapper d-flex flex-grow-1">
          <div className="compose-main-content-area flex-grow-1 p-3 p-md-4">
            <StepContent
              activeStep={activeStep}
              quillRef={quillRef}
              editorContent={editorContent}
              setEditorContent={setEditorContent}
            />
          </div>
          <div className="compose-right-sidebar-wrapper">
            <RightSidebar />
          </div>
        </div>
      </div>

      <PreviewModal
        show={showPreview}
        content={previewContent}
        onClose={() => setShowPreview(false)}
      />
    </div>
  );
};

export default Compose;
