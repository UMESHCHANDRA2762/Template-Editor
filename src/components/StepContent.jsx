import React, { useEffect, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../index.css";
import ImageResize from "quill-image-resize-module-react";
import AIContentGenerator from "./AIContentGenerator";

Quill.register("modules/imageResize", ImageResize);

const StepContent = ({
  activeStep,
  quillRef,
  editorContent,
  setEditorContent,
  isNewTemplate = false,
}) => {
  const [editorHeight, setEditorHeight] = useState(1200);

  const replacePlaceholdersWithValues = (html) => {
    return html.replace(
      /{{(.*?)}}/g,
      (_, key) => dummyValues[key.trim()] || `{{${key}}}`
    );
  };

  useEffect(() => {
    if (!isNewTemplate) {
      const savedContent = localStorage.getItem("editorContent");
      if (savedContent) {
        setEditorContent(savedContent);
      }
    }
  }, [setEditorContent, isNewTemplate]);

  useEffect(() => {
    if (!isNewTemplate) {
      localStorage.setItem("editorContent", editorContent);
    }
  }, [editorContent, isNewTemplate]);

  useEffect(() => {
    const editor = quillRef.current?.getEditor();
    if (!editor) return;

    const undoBtn = document.getElementById("undo-btn");
    const redoBtn = document.getElementById("redo-btn");

    const undo = () => editor.history.undo();
    const redo = () => editor.history.redo();

    undoBtn?.addEventListener("click", undo);
    redoBtn?.addEventListener("click", redo);

    return () => {
      undoBtn?.removeEventListener("click", undo);
      redoBtn?.removeEventListener("click", redo);
    };
  }, [quillRef]);

  useEffect(() => {
    const editor = quillRef.current?.getEditor();
    if (!editor) return;

    const handleKeydown = (e) => {
      const selection = editor.getSelection();
      if (!selection) return;

      const [leaf] = editor.getLeaf(selection.index);
      if (leaf && leaf.domNode?.tagName === "IMG") {
        if (e.key === "Backspace" || e.key === "Delete") {
          editor.deleteText(selection.index, 1);
        }
      }
    };

    const editorElement = quillRef.current?.root;
    editorElement?.addEventListener("keydown", handleKeydown);

    return () => {
      editorElement?.removeEventListener("keydown", handleKeydown);
    };
  }, [quillRef]);

  const modules = {
    toolbar: {
      container: "#quill-toolbar",
    },
    history: {
      delay: 1000,
      maxStack: 100,
      userOnly: true,
    },
    imageResize: {
      modules: ["Resize", "DisplaySize", "Toolbar"],
    },
  };

  useEffect(() => {
    const editorElement = quillRef.current?.root;
    if (editorElement) {
      const contentHeight = editorElement.scrollHeight;
      if (contentHeight > 1200) {
        setEditorHeight(contentHeight);
      }
    }
  }, [editorContent, quillRef]);

  return (
    <div
      className="bg-white rounded"
      style={{
        minHeight: "500px",
        boxShadow: "0px 0px 12px rgba(0, 0, 0, 0.05)",
        border: "none",
        padding: 0,
      }}
    >
      <div className="d-flex justify-content-between align-items-center mb-3 px-3 pt-3">
        <h2 className="h5 fw-bold m-0">
          {activeStep === "compose" ? "Simple Web Editor" : "Preview Document"}
        </h2>
        <div className="btn-group">
          <button className="btn btn-sm border bg-white text-dark px-3 py-2">
            Word Editor
          </button>
          <button className="btn btn-sm border bg-white text-dark px-3 py-2">
            MS Word
          </button>
        </div>
      </div>

      <p className="text-secondary small mb-3 px-3">
        {activeStep === "compose"
          ? "Use the built-in web editor to compose your document"
          : "This is the final preview of your document with actual values."}
      </p>

      {activeStep === "compose" && (
        <>
          <div
            id="quill-toolbar"
            className="mb-3 d-flex flex-wrap gap-2 align-items-center px-3"
            style={{
              borderTop: "1px solid #d0d0d0",
              borderBottom: "1px solid #d0d0d0",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.25)",
              backgroundColor: "#fff",
              paddingTop: "8px",
              paddingBottom: "8px",
            }}
          >
            <button className="ql-image" title="Insert Image" />
            <select className="ql-header" defaultValue="">
              <option value="">Paragraph</option>
              <option value="4">Title</option>
              <option value="1">Heading 1</option>
              <option value="2">Heading 2</option>
            </select>
            <select className="ql-size" defaultValue="16px">
              <option value="12px">12px</option>
              <option value="16px">16px</option>
              <option value="20px">20px</option>
              <option value="24px">24px</option>
              <option value="28px">28px</option>
              <option value="32px">32px</option>
              <option value="36px">36px</option>
            </select>
            <button className="ql-bold" />
            <button className="ql-italic" />
            <button className="ql-underline" />
            <button className="ql-link" />
            <button className="ql-list" value="ordered" />
            <button className="ql-list" value="bullet" />
            <button className="ql-align" value="" />
            <button className="ql-align" value="center" />
            <button className="ql-align" value="right" />
            <button className="ql-align" value="justify" />

            <button id="undo-btn" className="btn btn-outline-secondary btn-sm">
              <i className="fas fa-undo"></i>
            </button>
            <button id="redo-btn" className="btn btn-outline-secondary btn-sm">
              <i className="fas fa-redo"></i>
            </button>
          </div>

          <AIContentGenerator quillRef={quillRef} />
        </>
      )}

      <div
        className="d-flex justify-content-center"
        style={{ overflow: "auto" }}
      >
        <div
          className="ql-editor-wrapper bg-white mx-auto"
          style={{
            width: "950px",
            minHeight: "600px",
            maxHeight: "1200px",
            overflowY: "auto",
            padding: "60px 40px",
            boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
            borderRadius: "6px",
            marginTop: "40px",
          }}
        >
          {activeStep === "compose" ? (
            <ReactQuill
              ref={quillRef}
              value={editorContent}
              onChange={setEditorContent}
              modules={modules}
              theme="snow"
              placeholder="Start writing here..."
              style={{ minHeight: "500px" }}
            />
          ) : (
            <div
              dangerouslySetInnerHTML={{
                __html: replacePlaceholdersWithValues(editorContent),
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default StepContent;
