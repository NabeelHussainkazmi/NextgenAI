import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedTaskResponse, Task } from "../types";

// Initialize Gemini Client
// Note: We use process.env.API_KEY as per instructions.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateTasksFromGoal = async (goal: string): Promise<Task[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate a list of 4-6 actionable project management tasks for the following goal: "${goal}". 
      Ensure tasks vary in priority and estimated hours. Keep descriptions concise.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            tasks: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  priority: { type: Type.STRING, enum: ["High", "Medium", "Low"] },
                  estimatedHours: { type: Type.NUMBER },
                  description: { type: Type.STRING },
                },
                required: ["title", "priority", "estimatedHours", "description"],
              },
            },
          },
          required: ["tasks"],
        },
      },
    });

    const data = JSON.parse(response.text || '{"tasks": []}') as GeneratedTaskResponse;
    
    // Transform to internal Task type with IDs
    return data.tasks.map((t) => ({
      id: crypto.randomUUID(),
      title: t.title,
      description: t.description,
      priority: t.priority,
      status: 'Todo',
      estimatedHours: t.estimatedHours
    }));

  } catch (error) {
    console.error("Failed to generate tasks:", error);
    throw new Error("Could not generate tasks. Please check your API key or try again.");
  }
};