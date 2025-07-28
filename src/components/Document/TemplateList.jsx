import React from "react";
import TemplateActions from "./TemplateActions";

const TemplateList = ({ templates, onEdit, onDelete, onView }) => {
  const desktopHeader = (
    <div
      className="d-none d-md-flex bg-light px-3 py-2 rounded-top"
      style={{
        fontWeight: 600,
        color: "#333",
        border: "1px solid #dee2e6",
        borderBottom: "none",
        minWidth: "780px",
      }}
    >
      <div
        className="flex-grow-1"
        style={{ flexBasis: "25%", minWidth: "180px" }}
      >
        Document Name
      </div>
      <div
        className="flex-grow-1"
        style={{ flexBasis: "20%", minWidth: "140px" }}
      >
        Folder
      </div>
      <div
        className="flex-grow-1"
        style={{ flexBasis: "20%", minWidth: "140px" }}
      >
        Action Type
      </div>
      <div
        className="flex-grow-1"
        style={{ flexBasis: "20%", minWidth: "140px" }}
      >
        Last Used
      </div>
      <div
        className="flex-shrink-0 text-start"
        style={{ flexBasis: "15%", minWidth: "130px" }}
      >
        Actions
      </div>
    </div>
  );

  if (templates.length === 0) {
    return (
      <div className="w-100">
        <div className="d-none d-md-block">
          <div className="table-responsive">
            {desktopHeader}
            <div
              className="text-center py-5 text-muted border border-top-0 rounded-bottom"
              style={{ minWidth: "780px" }}
            >
              No templates available.
            </div>
          </div>
        </div>
        <div className="d-block d-md-none">
          <div className="text-center py-4 text-muted">
            No templates available.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-100">
      <div className="d-none d-md-block">
        <div className="table-responsive">
          {desktopHeader}
          {templates.map((template) => (
            <div
              key={template.id}
              className="d-flex align-items-center px-3 py-2 border-start border-end border-bottom"
              style={{
                backgroundColor: "#fff",
                minWidth: "780px",
              }}
            >
              <div
                className="flex-grow-1 text-truncate"
                style={{
                  flexBasis: "25%",
                  minWidth: "180px",
                  color: "#4B0082",
                  fontWeight: 600,
                }}
                title={template.documentName}
              >
                {template.documentName}
              </div>
              <div
                className="flex-grow-1 d-flex align-items-center text-truncate"
                style={{ flexBasis: "20%", minWidth: "140px", gap: "5px" }}
                title="Employee letters"
              >
                <i className="bi bi-folder2-open"></i>
                <span>Employee letters</span>
              </div>
              <div
                className="flex-grow-1 d-flex align-items-center text-truncate"
                style={{ flexBasis: "20%", minWidth: "140px", gap: "5px" }}
                title="Document Generation"
              >
                <i className="bi bi-file-earmark"></i>
                <span>Document Generation</span>
              </div>
              <div
                className="flex-grow-1 text-truncate"
                style={{ flexBasis: "20%", minWidth: "140px" }}
                title={template.lastUsed}
              >
                {template.lastUsed}
              </div>
              <div
                className="flex-shrink-0 d-flex align-items-center justify-content-start flex-nowrap"
                style={{ flexBasis: "15%", minWidth: "130px", gap: "8px" }}
              >
                <TemplateActions
                  template={template}
                  onView={onView}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  isMobileView={false}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="d-block d-md-none">
        {templates.map((template) => (
          <div
            key={template.id}
            className="d-flex flex-column border rounded p-3 my-2 bg-white shadow-sm"
          >
            <div className="mb-2 d-flex justify-content-between align-items-start">
              <div>
                <small className="text-muted">Document Name</small>
                <div
                  className="fw-bold text-wrap"
                  style={{ color: "#4B0082", lineHeight: "1.3" }}
                >
                  {template.documentName}
                </div>
              </div>
            </div>
            <div className="mb-2">
              <small className="text-muted d-block mb-1">Folder</small>
              <span>
                <i className="bi bi-folder2-open me-1"></i>
                Employee letters
              </span>
            </div>
            <div className="mb-2">
              <small className="text-muted d-block mb-1">Action Type</small>
              <span>
                <i className="bi bi-file-earmark me-1"></i>
                Document Generation
              </span>
            </div>
            <div className="mb-3">
              <small className="text-muted d-block mb-1">Last Used</small>
              <span>{template.lastUsed}</span>
            </div>
            <div className="mt-auto pt-2 border-top">
              <TemplateActions
                template={template}
                onView={onView}
                onEdit={onEdit}
                onDelete={onDelete}
                isMobileView={true}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateList;
