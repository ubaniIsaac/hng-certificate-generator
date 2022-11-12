import NotFoundError from '../errors/not-found.js';
import path from 'path';
export const uploadCsv = async (req, res) => {
  const csv = req.files.upload.name;

  if (path.extname(csv) !== '.csv') {
    throw new NotFoundError('No csv file found!, please input a csv file');
  }
  res.json({ message: 'success' });
};
