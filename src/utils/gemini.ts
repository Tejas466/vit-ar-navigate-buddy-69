
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the API with the provided key
const genAI = new GoogleGenerativeAI("AIzaSyCeeQH5t2hAOkr6kZBPklGaaTcLnNeg_Rw");

export const getGeminiResponse = async (prompt: string): Promise<string> => {
  try {
    // Using gemini-1.5-flash which is the latest available model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `You are an AI assistant for VIT Pune college.
              You should provide helpful, accurate, and detailed information about VIT Pune.
              If asked about something not related to VIT Pune, politely explain you can only answer questions about VIT Pune.
              
              Question: ${prompt}`
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1024,
      }
    });
    
    if (!result.response || !result.response.text()) {
      return "I apologize, but I couldn't find information about that. Please try asking something else about VIT Pune.";
    }
    
    return result.response.text();
  } catch (error) {
    console.error('Error getting Gemini response:', error);
    return "I apologize, but I'm having trouble connecting to my knowledge base right now. Please try again in a moment.";
  }
};
