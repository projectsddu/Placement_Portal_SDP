const AdmZip = require('adm-zip');
const fs = require("fs")
const path = require("path")
const logger = require("serverloggerjs/logger")
const log = new logger(true)


const downloadZipFile = async (fromDir, zipFileName, selectFileNames = "all") => {
    const cvPathName = path.join(__dirname, "..", "public", "student_details", "CV")
    const zipPath = path.join(__dirname, "..", "public", "student_details", "Zips")


    console.log(fs.readdirSync(cvPathName));
    try {
        const filesToZip = []
        if (selectFileNames == "all") {
            filesToZip = fs.readdirSync(cvPathName)
        }
        else {
            fs.readdirSync(cvPathName).map((elem) => {
                const fileName = elem.split(".")[0]
                if (selectFileNames.includes(fileName)) {
                    filesToZip.push(elem)
                }
            })
        }

        console.log(filesToZip);
        const zip = new AdmZip();
        for (let i = 0; i < filesToZip.length; i++) {
            const fileZippth = cvPathName + "\\" + filesToZip[i]
            zip.addLocalFile(fileZippth)
        }
        const downloadName = zipFileName + ".zip"
        const data = zip.toBuffer()
        zip.writeZip(zipPath + "/" + downloadName)
        return data
    }
    catch (err) {
        console.log(err.toString());
        log.error("Error creating Zip File!", err.toString())
        return false
    }
}

module.exports = {
    downloadZipFile
}