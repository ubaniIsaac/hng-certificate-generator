import express from 'express';
import { uploadCsv } from '../controllers/uploadCsv.js';
const router = express.Router();

router.post('/', uploadCsv);
export default router;
