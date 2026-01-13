import OpenAI from "openai";
import dotenv from 'dotenv';

dotenv.config();

// Initialize OpenAI Client
// RENDER NOTE: Ensure OPENAI_API_KEY is set in Render Environment Variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateGPTResponse = async (systemPrompt, userPrompt) => {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("Missing OPENAI_API_KEY in server environment.");
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Cost-effective, high intelligence
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7,
      response_format: { type: "json_object" }, // Strict JSON mode
    });

    const content = completion.choices[0].message.content;
    
    // Parse JSON
    try {
      return JSON.parse(content);
    } catch (e) {
      console.error("Failed to parse OpenAI response:", content);
      throw new Error("AI returned invalid JSON format.");
    }

  } catch (error) {
    console.error("OpenAI API Error:", error);
    throw new Error(error.message || "Failed to communicate with OpenAI.");
  }
};