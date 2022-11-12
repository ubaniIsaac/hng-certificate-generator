import NotFoundError from '../errors/not-found.js';
import BadRequestError from '../errors/bad-request.js';
import csvToJson from 'convert-csv-to-json';
export const uploadCsv = async (req, res) => {
  if (!req.file || Object.keys(req.file).length === 0) {
    throw new NotFoundError('No files were uploaded');
  }
  const csv = req.file;
  if (!csv?.originalname.includes('.csv')) {
    throw new BadRequestError('No csv file found, please input csv file');
  }

  const json = csvToJson.fieldDelimiter(',').getJsonFromCsv(csv.path);

  json.forEach((row) => {
    if (!row.name) {
      throw new BadRequestError('please input a name in your csv!!');
    }
    if (!row.date) {
      throw new BadRequestError('please input a date in your csv!!');
    }
    if (!row.certificate_number) {
      throw new BadRequestError(
        'please input a certificate number in your csv!!'
      );
    }
  });
  res.json({ result: json, count: json.length });
};
