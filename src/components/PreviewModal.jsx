import React from "react";

const PreviewModal = ({ show, content, onClose }) => {
  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 1000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          width: "595px",
          height: "421px",
          maxWidth: "90%",
          maxHeight: "80vh",
          overflowY: "auto",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <h5 className="mb-3">Preview</h5>
        <hr />
        <div
          dangerouslySetInnerHTML={{ __html: content }}
          style={{
            whiteSpace: "pre-wrap",
            wordWrap: "break-word",
            overflowY: "auto",
          }}
        />
        <button className="btn btn-secondary mt-3" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default PreviewModal;
