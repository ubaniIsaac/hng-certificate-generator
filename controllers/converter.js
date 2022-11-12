
const { parse } = require('csv-parse');
const fs = require('fs');

exports.converter = async (req, res) => {
    const file = req.file
    const jsonArr = []
    try {
        if (!file) {
            return res.status(400).json({ message: "Input a file" })
        }

        fs.createReadStream(file.path)
            .pipe(parse({
                columns: true,
                delimiter: ",",
                from_line: 1
            }))
            .on("data", async (row) => {
                jsonArr.push(row);
                jsonArr.forEach((row) => {
                    if (!row.name || !row.organization || !row.award || !row.description || !row.date || !row.certificate_number) {
                        return res.status(400).json({ 'Input a file with correct format!!'});
                    }
                })
            })
            .on('end', function () {
                res.send(jsonArr)
            })
    }


    catch (error) {
        res.status(500).json({ success: false, error: error })
        throw error
    }
}