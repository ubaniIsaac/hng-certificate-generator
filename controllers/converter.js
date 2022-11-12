const { parse } = require('csv-parse');
const fs = require('fs');

exports.converter = async (req, res) => {
    const file = req.file
    const jsonArr = []
    correctFormat = true
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
            })
            .on('end', function () {
                jsonArr.every((row) => {
                    if (!row.name || !row.organization || !row.award || !row.description || !row.date || !row.certificate_number) {
                        correctFormat = false
                        return false
                    }
                    return true
                })
                if (!correctFormat) {
                    return res.json({ message: 'Input a file with correct format!!' })
                }
                res.send(jsonArr)
            })
    }


    catch (error) {
        res.status(500).json({ success: false, error: error })
        throw error
    }
}