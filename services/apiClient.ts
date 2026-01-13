import { ToolDefinition } from "../types";

/**
 * PRODUCTION API CLIENT
 * Connects to the local Express backend on the same origin.
 */

const extractVideoID = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

export const callBackend = async (tool: ToolDefinition, inputs: Record<string, any>): Promise<any> => {
  // Static Tool Bypass (Thumbnail)
  if (tool.id === 'yt-thumbnail') {
    const videoId = extractVideoID(inputs.url);
    if (!videoId) throw new Error("Please enter a valid YouTube URL.");
    return { items: [`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`] };
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 60000); // 60s Timeout for AI

  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ 
        toolId: tool.id,
        inputs 
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    // Guard against HTML 404/500 pages from hosting
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text();
      console.error("[API Error Response]", text);
      throw new Error("Server communication failed. Please check your connection.");
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Engine generation failed.");
    }
    
    return data;

  } catch (error: any) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error("The AI is taking longer than expected. Please try again.");
    }
    throw new Error(error.message || "Connection failed.");
  }
};