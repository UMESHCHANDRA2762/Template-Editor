import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FaBold, FaItalic, FaUnderline, FaLink } from "react-icons/fa";
import "./SetUp.css";

const STEP_LABELS = ["Setup", "Compose", "Finalize"];
const PRIMARY_COLOR = "#6f42c1";

const SetUp = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm();

  const editorContent = watch("editorContent", "");

  const onSubmit = (data) => {
    localStorage.setItem("docName", data.name);
    localStorage.setItem("docDescription", data.editorContent);
    navigate("/compose");
  };

  const handleSave = () => {
    const name = watch("name");
    const content = watch("editorContent");
    localStorage.setItem("docName", name || "");
    localStorage.setItem("docDescription", content || "");
    alert("Document progress saved successfully!");
  };

  React.useEffect(() => {
    register("editorContent");
  }, [register]);

  const handleEditorChange = (value) => {
    setValue("editorContent", value, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-container">
      <div className="header-bar">
        <h1>Document Template</h1>
      </div>

      <div className="stepper-actions-bar">
        <div className="stepper-container">
          {STEP_LABELS.map((label, index) => {
            const isActive = label === "Setup";
            return (
              <button
                key={label}
                className="stepper-button"
                style={{ color: isActive ? PRIMARY_COLOR : "#888" }}
                type="button"
              >
                <span
                  className="stepper-button-number"
                  style={{
                    backgroundColor: isActive ? PRIMARY_COLOR : "#fff",
                    color: isActive ? "#fff" : PRIMARY_COLOR,
                    border: `2px solid ${PRIMARY_COLOR}`,
                  }}
                >
                  {index + 1}
                </span>
                <span className="stepper-button-label">{label}</span>
              </button>
            );
          })}
        </div>
        <div className="action-buttons-container">
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={() => navigate("/documents")}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn"
            style={{
              backgroundColor: PRIMARY_COLOR,
              color: "#fff",
              border: `1px solid ${PRIMARY_COLOR}`,
            }}
          >
            Continue
          </button>
        </div>
      </div>

      <div className="form-section">
        <div className="form-field-wrapper responsive-width-md">
          <label htmlFor="name" className="form-label">
            Document Name
          </label>
          <input
            id="name"
            className="form-control"
            placeholder="Enter a name for this document"
            {...register("name", { required: "Document name is required" })}
          />
          {errors.name && (
            <p className="text-danger mt-1">{errors.name.message}</p>
          )}
        </div>

        <div className="form-field-wrapper responsive-width-md">
          <label className="form-label">Describe this Document Template</label>
          <div className="editor-container">
            <div id="custom-toolbar">
              <button className="ql-bold" type="button" title="Bold">
                <FaBold />
              </button>
              <button className="ql-italic" type="button" title="Italic">
                <FaItalic />
              </button>
              <button className="ql-underline" type="button" title="Underline">
                <FaUnderline />
              </button>
              <button className="ql-link" type="button" title="Insert Link">
                <FaLink />
              </button>
            </div>
            <div className="react-quill-editor">
              <ReactQuill
                value={editorContent}
                onChange={handleEditorChange}
                placeholder="e.g., Template for employee salary increment notice"
                modules={{ toolbar: { container: "#custom-toolbar" } }}
                formats={["bold", "italic", "underline", "link"]}
              />
            </div>
          </div>

          {/* Save button container: Now aligned to the LEFT */}
          <div style={{ marginTop: "15px", textAlign: "left" }}>
            {" "}
            {/* CHANGED: textAlign to "left" */}
            <button
              type="button"
              className="btn"
              style={{
                backgroundColor: PRIMARY_COLOR,
                color: "#fff",
                border: "none",
              }}
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SetUp;
