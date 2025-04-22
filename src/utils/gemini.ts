
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the API with the provided key
const genAI = new GoogleGenerativeAI("AIzaSyCeeQH5t2hAOkr6kZBPklGaaTcLnNeg_Rw");

export const getGeminiResponse = async (prompt: string): Promise<string> => {
  try {
    // Use gemini-1.0-pro model instead of gemini-pro
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const result = await model.generateContent(`You are a helpful AI assistant for VIT Pune college. 
    You should only answer questions related to VIT Pune college. 
    If the question is not related to VIT Pune, politely decline to answer.
    
    Question: ${prompt}`);
    
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error('Error getting Gemini response:', error);
    return "I apologize, but I'm having trouble processing your request at the moment. Please try again later.";
  }
};
