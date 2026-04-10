import { GoogleGenAI, Type } from "@google/genai";

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const callAI = async (systemPrompt: string, userMessage: string, imageBase64: string | null = null, responseSchema?: any) => {
  try {
    const parts: any[] = [];
    if (imageBase64) {
      // Extract mime type and base64 data
      const match = imageBase64.match(/^data:(.+);base64,(.+)$/);
      if (match) {
        parts.push({
          inlineData: {
            mimeType: match[1],
            data: match[2]
          }
        });
      }
    }
    parts.push({ text: userMessage });

    const config: any = {
      systemInstruction: systemPrompt,
    };

    if (responseSchema) {
      config.responseMimeType = "application/json";
      config.responseSchema = responseSchema;
    }

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: { parts },
      config
    });

    return response.text;
  } catch (error) {
    console.error("AI call failed:", error);
    throw error;
  }
};

export const streamAI = async (systemPrompt: string, messages: {role: string, content: string}[], onChunk: (text: string) => void) => {
  try {
    // Convert messages to Gemini format
    const contents = messages.map(m => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }]
    }));

    const responseStream = await ai.models.generateContentStream({
      model: "gemini-3-flash-preview",
      contents: contents,
      config: {
        systemInstruction: systemPrompt,
      }
    });

    for await (const chunk of responseStream) {
      if (chunk.text) {
        onChunk(chunk.text);
      }
    }
  } catch (error) {
    console.error("AI stream failed:", error);
    throw error;
  }
};
