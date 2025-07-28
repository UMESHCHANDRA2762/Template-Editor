// components/AIContentGenerator.jsx
import React, { useState } from "react";
import { Quill } from "react-quill"; // Import Quill for sources
import {
  getAIDrivenText,
  transformMarkdownStarsToHTML,
} from "../Services/aiService"; // Adjust path if needed

const AIContentGenerator = ({ quillRef }) => {
  const [showModal, setShowModal] = useState(false);
  const [promptText, setPromptText] = useState(
    "Write a professional opening paragraph for an employee offer letter."
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAISuggestion = async () => {
    if (!promptText.trim()) {
      setError("Prompt cannot be empty.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      let aiText = await getAIDrivenText(promptText);
      aiText = transformMarkdownStarsToHTML(aiText);

      const styledText = `<div style="font-family: 'Poppins', sans-serif; background: #f4f4f4; padding: 10px; border-left: 4px solid #007bff; margin-top: 10px; margin-bottom: 10px;">${aiText}</div>`;

      const editor = quillRef.current?.getEditor();
      if (editor) {
        const selection = editor.getSelection();
        let index = selection ? selection.index : editor.getLength();

        // Ensure insertion is on a new line or as a distinct block
        if (index > 0) {
          const [line, offset] = editor.getLine(index);
          if (offset > 0) {
            // Not at the beginning of a line
            editor.insertText(index, "\n", Quill.sources.USER);
            index++; // Increment index because of the new line
          }
        }

        editor.clipboard.dangerouslyPasteHTML(
          index,
          styledText,
          Quill.sources.USER
        );
        // Move cursor to the end of the pasted content
        // Note: accurately getting the length of pasted HTML to set cursor can be tricky.
        // This is a simplification. For precise cursor placement, might need to calculate delta length.
        editor.setSelection(index + 1, 0, Quill.sources.USER); // Move cursor to start of new line after pasted content
      }
      setShowModal(false);
    } catch (err) {
      console.error("AI Generation Error in Component:", err);
      setError(
        err.message ||
          "AI generation failed. Please check your setup or try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const openModal = () => {
    setError("");
    setPromptText(
      "Write a professional opening paragraph for an employee offer letter."
    ); // Reset prompt
    setShowModal(true);
  };

  return (
    <>
      <button
        className="btn btn-primary mx-auto d-block"
        onClick={openModal}
        title="Generate New Content with AI"
        style={{ minWidth: "180px" }}
      >
        Generate using AI
      </button>

      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ background: "rgba(0,0,0,0.5)" }}
          onClick={(e) => {
            if (e.target === e.currentTarget && !loading) setShowModal(false);
          }}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Generate Content with AI</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => !loading && setShowModal(false)}
                  disabled={loading}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
                <textarea
                  rows={4}
                  className="form-control"
                  placeholder="Enter your prompt..."
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                  disabled={loading}
                ></textarea>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => !loading && setShowModal(false)}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleAISuggestion}
                  disabled={loading || !promptText.trim()}
                >
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Generating...
                    </>
                  ) : (
                    "Generate"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIContentGenerator;
