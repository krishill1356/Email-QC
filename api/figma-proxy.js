// api/figma-proxy.js
import axios from 'axios';

export default async function handler(req, res) {
  // Your Figma access token stored as an environment variable
  const FIGMA_ACCESS_TOKEN = process.env.FIGMA_ACCESS_TOKEN;
  
  if (!FIGMA_ACCESS_TOKEN) {
    return res.status(500).json({ error: "Missing FIGMA_ACCESS_TOKEN environment variable" });
  }
  
  // Get file key from query params
  const { fileKey } = req.query;
  
  if (!fileKey) {
    return res.status(400).json({ error: "Missing fileKey parameter" });
  }
  
  try {
    const response = await axios.get(`https://api.figma.com/v1/files/${fileKey}`, {
      headers: {
        'X-Figma-Token': FIGMA_ACCESS_TOKEN
      }
    });
    
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(error.response?.status || 500).json({ 
      error: error.message,
      details: error.response?.data 
    });
  }
}
