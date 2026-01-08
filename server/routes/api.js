import express from 'express';
import { handleGenerate } from '../controllers/generateController.js';

const router = express.Router();

// POST /api/generate
router.post('/generate', handleGenerate);

export default router;