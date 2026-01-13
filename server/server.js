import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import apiRoutes from './routes/api.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- MIDDLEWARE ---
// Allow Hostinger frontend to access Render backend
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// --- ROUTES ---
app.use('/api', apiRoutes);

// Health Check for Render
app.get('/health', (req, res) => res.status(200).send('OK'));

// Serve Static (Optional fallback if you run frontend here too)
app.use(express.static(path.join(__dirname, '../dist')));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});