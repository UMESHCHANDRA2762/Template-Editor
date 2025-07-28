import React, { useState, useEffect } from "react";

const EditTemplateForm = ({ template, onSave, onCancel }) => {
  const [documentName, setDocumentName] = useState(
    template?.documentName || ""
  );
  const [content, setContent] = useState(template?.content || "");

  useEffect(() => {
    setDocumentName(template?.documentName || "");
    setContent(template?.content || "");
  }, [template]);

  const handleSave = () => {
    if (documentName && content) {
      onSave({ ...template, documentName, content });
    } else {
      alert("Both fields are required");
    }
  };

  return (
    <div className="edit-template-form">
      <h3>Edit Template</h3>
      <div className="form-group">
        <label>Document Name</label>
        <input
          type="text"
          value={documentName}
          onChange={(e) => setDocumentName(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="form-control"
          rows="10"
        ></textarea>
      </div>
      <div className="form-actions">
        <button className="btn btn-primary" onClick={handleSave}>
          Save Changes
        </button>
        <button
          className="btn btn-secondary"
          onClick={onCancel}
          style={{ marginLeft: "10px" }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditTemplateForm;
