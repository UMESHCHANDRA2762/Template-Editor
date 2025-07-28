import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Document/Navbar";
import EditTemplateForm from "../components/Document/EditTemplateForm";
import FilterBar from "../components/Document/FilterBar";
import TemplateList from "../components/Document/TemplateList";
import "../index.css";

const navItems = [
  "Document Templates",
  "Employee Documents",
  "Organize Documents",
];

const Documents = () => {
  const [active, setActive] = useState(navItems[0]);
  const navigate = useNavigate();
  const [templates, setTemplates] = useState([]);
  const [editingTemplate, setEditingTemplate] = useState(null);

  useEffect(() => {
    const storedTemplates = JSON.parse(localStorage.getItem("templates")) || [];
    setTemplates(storedTemplates);
  }, []);

  const handleSave = () => {
    const updatedTemplate = { ...editingTemplate };
    const updatedTemplates = templates.map((t) =>
      t.id === updatedTemplate.id ? updatedTemplate : t
    );
    setTemplates(updatedTemplates);
    localStorage.setItem("templates", JSON.stringify(updatedTemplates));
    setEditingTemplate(null);
  };

  return (
    <div className="w-100">
      <Navbar navItems={navItems} active={active} setActive={setActive} />

      <div className="container-fluid mt-4 px-3 px-md-4">
        {active === "Document Templates" && (
          <div className="card shadow-sm border-0 w-100">
            <div className="card-body">
              {/* Title + Button Row */}
              <div className="row align-items-center mb-3">
                <div className="col-12 col-md-6">
                  <h3 className="m-0" style={{ color: "#4B0082" }}>
                    Document Templates
                  </h3>
                </div>
                <div className="col-12 col-md-6 text-md-end mt-2 mt-md-0">
                  <button
                    className="btn"
                    style={{
                      border: "2px solid #4B0082",
                      color: "#4B0082",
                      backgroundColor: "transparent",
                    }}
                    onClick={() => navigate("/setup")}
                  >
                    + Create Template
                  </button>
                </div>
              </div>

              {/* Description */}
              <p className="text-muted mb-4">
                Generate agreements, employee letters or compliance forms and
                send for signature/upload/acknowledgement.
              </p>

              {/* Filter Bar */}
              <FilterBar />

              {/* Template List */}
              <TemplateList
                templates={templates}
                onEdit={setEditingTemplate}
                onDelete={(id) => {
                  const updated = templates.filter((t) => t.id !== id);
                  setTemplates(updated);
                  localStorage.setItem("templates", JSON.stringify(updated));
                }}
                onView={(t) =>
                  navigate("/finalize", { state: { content: t.content } })
                }
              />
            </div>
          </div>
        )}

        {/* Other tabs placeholder */}
        {active !== "Document Templates" && (
          <div className="bg-light p-4 rounded text-muted mt-3 w-100">
            <h4 className="mb-2">{active}</h4>
            <p>This section is under construction. Please check back later.</p>
          </div>
        )}

        {/* Edit Template Form */}
        {editingTemplate && (
          <div className="mt-4 w-100">
            <EditTemplateForm
              template={editingTemplate}
              onSave={handleSave}
              onCancel={() => setEditingTemplate(null)}
            />
          </div>
        )}

        {/* Preview */}
        {editingTemplate?.content && (
          <div
            className="mt-4 p-3 bg-white border rounded shadow-sm w-100"
            dangerouslySetInnerHTML={{ __html: editingTemplate.content }}
          ></div>
        )}
      </div>
    </div>
  );
};

export default Documents;
