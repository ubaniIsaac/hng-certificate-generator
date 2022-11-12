const express = require('express');
const { converter } = require('../controllers/converter')
const multer = require('multer')


const multerFilter = (req, file, cb) => {
    if (file.mimetype.split('/')[1] === 'csv') {
        cb(null, true)
    } else {
        cb(new Error('Please Upload a CSV FILE with correct format'), false)
    }
}

const upload = multer({
    dest: "uploads/",
    fileFilter: multerFilter
})

const converterRoute = express.Router();

module.exports = app => {
    converterRoute.post('/', upload.single('file'), converter);

    app.use('/', converterRoute)
    app.use((err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        });
        next();
    })
}