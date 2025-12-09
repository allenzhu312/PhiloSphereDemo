import { GoogleGenAI, Type, Schema } from "@google/genai";
import { PhilosopherSummary, PhilosopherDetail } from "../types";

// Ensure API key is present
const apiKey = process.env.API_KEY || '';

const ai = new GoogleGenAI({ apiKey });

const summarySchema: Schema = {
  type: Type.OBJECT,
  properties: {
    philosophers: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          name: { type: Type.STRING },
          tagline: { type: Type.STRING },
          era: { type: Type.STRING },
          school: { type: Type.STRING },
        },
        required: ["id", "name", "tagline", "era", "school"],
      },
    },
  },
  required: ["philosophers"],
};

const detailSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    bio: { type: Type.STRING, description: "A comprehensive 2-paragraph biography." },
    famousWorks: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING },
      description: "List of 3-5 most important books or essays."
    },
    quotes: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING },
      description: "List of 4-6 most famous quotes."
    },
    coreIdeas: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "3 key philosophical concepts they are known for."
    }
  },
  required: ["bio", "famousWorks", "quotes", "coreIdeas"],
};

export const fetchPhilosophers = async (): Promise<PhilosopherSummary[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Generate a list of 12 distinct, famous philosophers from diverse eras and cultures (e.g., Greek, Eastern, Modern, Existentialist).",
      config: {
        responseMimeType: "application/json",
        responseSchema: summarySchema,
        systemInstruction: "You are a helpful philosophy expert. Return clean JSON.",
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");
    
    const json = JSON.parse(text);
    return json.philosophers;
  } catch (error) {
    console.error("Error fetching philosophers:", error);
    throw error;
  }
};

export const fetchPhilosopherDetail = async (summary: PhilosopherSummary): Promise<PhilosopherDetail> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Provide detailed information about the philosopher ${summary.name} (${summary.era}).`,
      config: {
        responseMimeType: "application/json",
        responseSchema: detailSchema,
        systemInstruction: "You are an expert biographer and philosopher. Provide accurate, insightful, and engaging content.",
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");

    const json = JSON.parse(text);
    
    return {
      ...summary,
      ...json,
    };
  } catch (error) {
    console.error(`Error fetching details for ${summary.name}:`, error);
    throw error;
  }
};
