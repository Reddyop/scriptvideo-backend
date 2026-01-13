import express from 'express';
import { handleGenerate } from '../controllers/generateController.js';

const router = express.Router();

// POST /api/generate/:toolId
// Example: /api/generate/yt-title
router.post('/generate/:toolId', handleGenerate);

export default router;