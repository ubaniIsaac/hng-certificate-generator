import express from 'express';
import { uploadCsv } from '../controllers/uploadCsv.js';
import multer from 'multer';
import os from 'os';
const router = express.Router();
const upload = multer({ dest: os.tmpdir() });
router.post('/', upload.single('csv'), uploadCsv);
export default router;
