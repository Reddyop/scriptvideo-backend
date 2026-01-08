import { generateGPTResponse } from '../services/openaiService.js';

export const handleGenerate = async (req, res) => {
  try {
    const { toolId, inputs } = req.body;

    // --- SYSTEM PROMPT ---
    const systemInstruction = `
      You are Script Video AI, an elite YouTube content strategist.
      
      OUTPUT RULES:
      1. You must output ONLY valid JSON.
      2. No markdown formatting (like \`\`\`json).
      3. Follow the schema requested strictly.
      
      SCHEMAS:
      Type A (Lists): { "items": ["Item 1", "Item 2"] }
      Type B (Sections): { "sections": [{ "heading": "...", "content": "...", "items": [] }] }
    `;

    // --- PROMPT ENGINEERING ---
    let userPrompt = "";
    switch (toolId) {
      case 'yt-breakdown':
        userPrompt = `Analyze "${inputs.url || inputs.topic}". Break down into 3 sections: Hook Strategy, Retention Structure, Payoff. Return as Schema Type B.`;
        break;
      case 'yt-title':
        userPrompt = `Generate 15 high-CTR YouTube titles for "${inputs.topic}". Return as Schema Type A.`;
        break;
      case 'yt-hook':
        userPrompt = `Generate 10 viral hooks (first 5s) for "${inputs.topic}". Return as Schema Type A.`;
        break;
      case 'yt-keyword':
        userPrompt = `Identify 20 high-opportunity keywords for "${inputs.topic}". Group by volume. Return as Schema Type B.`;
        break;
      case 'yt-tags':
        userPrompt = `Generate 30 comma-separated SEO tags for "${inputs.topic}". Return as Schema Type A.`;
        break;
      case 'yt-description':
        userPrompt = `Write an SEO description for "${inputs.topic}" using keywords: ${inputs.keywords}. Return as Schema Type B.`;
        break;
      case 'yt-thumb-text':
        userPrompt = `Generate 10 punchy thumbnail text overlays (max 4 words) for "${inputs.topic}". Return as Schema Type A.`;
        break;
      case 'strat-plan':
        userPrompt = `Create a 30-day growth plan for "${inputs.niche}" channel (Goal: ${inputs.goal}). Return as Schema Type B.`;
        break;
      case 'strat-ideas':
        userPrompt = `Generate 20 viral video concepts for "${inputs.niche}". Return as Schema Type A.`;
        break;
      case 'strat-names':
        userPrompt = `Generate 20 brandable channel names for vibe "${inputs.vibe}". Return as Schema Type A.`;
        break;
      case 'strat-niche':
        userPrompt = `List 15 profitable sub-niches for interest "${inputs.interest}". Return as Schema Type A.`;
        break;
      case 'yt-transcript':
         userPrompt = `Create a video script outline for "${inputs.topic}". Return as Schema Type B.`;
         break;
      default:
        userPrompt = `Generate content for ${toolId} with inputs ${JSON.stringify(inputs)}. Return valid JSON.`;
    }

    // --- CALL OPENAI ---
    const jsonResponse = await generateGPTResponse(systemInstruction, userPrompt);
    
    return res.status(200).json(jsonResponse);

  } catch (error) {
    console.error("[Backend Controller Error]", error);
    return res.status(500).json({ 
      success: false, 
      message: error.message || "Server Error"
    });
  }
};