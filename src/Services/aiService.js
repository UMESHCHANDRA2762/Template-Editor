// src/services/aiService.js
import { GoogleGenerativeAI } from "@google/generative-ai";

// This line correctly attempts to read the VITE_prefixed environment variable
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

let genAIInstance;
let modelInstance;

const getGenAI = () => {
  if (!genAIInstance) {
    if (!API_KEY) {
      // CORRECTED: Error message now refers to VITE_GEMINI_API_KEY
      console.error(
        "Gemini API Key is missing or not exposed. Please ensure VITE_GEMINI_API_KEY is set in your .env file and the development server was restarted."
      );
      throw new Error("AI Service not configured: API Key missing.");
    }
    // CORRECTED: Use the API_KEY variable (which holds the string from .env)
    // instead of a hardcoded key or an undefined variable.
    genAIInstance = new GoogleGenerativeAI(API_KEY);
  }
  return genAIInstance;
};

const getModel = (modelName = "gemini-2.0-flash") => {
  // This caching logic will create the model instance once for "gemini-2.0-flash"
  // and reuse it. If you switch modelNames, it would create a new instance for that.
  if (!modelInstance || modelInstance.model !== modelName) {
    // Note: modelInstance.model might not directly store the string like this.
    // A more robust cache might key by modelName string.
    // But for a single, default model, this works to initialize once.
    const genAI = getGenAI();
    modelInstance = genAI.getGenerativeModel({
      model: modelName, // This is correct, modelName like "gemini-2.0-flash"
      safetySettings: [
        { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_NONE",
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_NONE",
        },
      ],
    });
  }
  return modelInstance;
};

/**
 * Generates content using the AI model.
 * @param {string} promptText The prompt to send to the AI.
 * @returns {Promise<string>} The text response from the AI.
 */
export const getAIDrivenText = async (promptText) => {
  try {
    const model = getModel();
    const result = await model.generateContent(promptText);
    const response = await result.response;
    const text = await response.text();
    return text;
  } catch (error) {
    console.error("Gemini AI error in aiService:", error);
    let errorMessage = "AI content generation failed.";
    if (error.message) {
      errorMessage += ` Details: ${error.message}`;
    }
    if (
      error.message &&
      (error.message.includes("API key not valid") ||
        error.message.includes("permission") ||
        error.message.includes("forbidden"))
    ) {
      errorMessage =
        "AI Service Error: The API key may be invalid, not authorized for this model, or missing required permissions. Please check your Google Cloud project and API key configuration.";
    }
    throw new Error(errorMessage);
  }
};

export const transformMarkdownStarsToHTML = (text) => {
  if (!text) return "";
  // Corrected the extra space after </strong>
  let result = text.replace(/\*\*\s*(.*?)\s*\*\*/g, "<strong>$1</strong>");
  const lines = result.split("\n");
  const listItems = [];
  const normalLines = [];

  lines.forEach((line) => {
    if (line.startsWith("* ")) {
      listItems.push(line.slice(2));
    } else {
      normalLines.push(line);
    }
  });

  if (listItems.length > 0) {
    const ul = `<ul>${listItems
      .map((item) => `<li>${item}</li>`)
      .join("")}</ul>`;
    const normalLinesHtml = normalLines.join("<br />");
    result = normalLinesHtml ? normalLinesHtml + "<br />" + ul : ul;
  } else {
    result = normalLines.join("<br />");
  }

  return result;
};
