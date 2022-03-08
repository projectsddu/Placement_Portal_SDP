// require("dotenv").config();
const { google, oauth2_v2, cloudfunctions_v1 } = require("googleapis")
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URI = process.env.REDIRECT_URI
const REFRESH_TOKEN = process.env.REFRESH_TOKEN
const ResponseService = require("../../Services/ResponseService")
const ERROR = ResponseService.ERROR
const fs = require("fs")
const Readable = require('stream').Readable;
const stringToStream = require("string-to-stream")

// console.log(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN)

const uploadFile = async (fileData, fileName, mimeType, drive) => {
    try {
        const res = await drive.files.create({
            requestBody: {
                name: fileName,
                mimeType: mimeType
            },
            media: {
                mimeType: mimeType,
                body: bufferToStream(fileData)
            }
        })
        console.log(res.data)
        return res.data
    }
    catch (err) {
        console.log(err)
        return false
    }
}

function bufferToStream(buffer) {
    var stream = new Readable();
    stream.push(buffer);
    stream.push(null);

    return stream;
}

const changePermissions = async (drive, fileId) => {
    try {
        const resp = await drive.permissions.create({
            fileId: fileId,
            requestBody: {
                role: "reader",
                type: 'anyone'
            }

        })
        return resp.status == 200 ? true : false
    }
    catch (err) {
        console.log(err)
        return false
    }
}

const getLink = async (drive, fileId) => {
    try {
        const res1 = await drive.files.get({
            fileId: fileId,
            fields: 'webViewLink,webContentLink,iconLink,thumbnailLink'
        })
        return res1.data
    }
    catch (err) {
        console.log(err)
        return false
    }
}




const fileUploadMiddleware = async (req, res, next) => {
    try {
        console.log(req.files.Student_Photo_File)
        const fileName = req.files.Student_Photo_File.name
        const data = req.files.Student_Photo_File.data
        const mimeType = req.files.Student_Photo_File.mimetype

        const OAuthClient = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
        OAuthClient.setCredentials({ refresh_token: REFRESH_TOKEN })
        const drive = google.drive({
            version: "v3",
            auth: OAuthClient
        })

        const fileUploadData = await uploadFile(data, fileName, mimeType, drive)
        if (fileUploadData) {
            console.log(fileUploadData)
            const fileId = fileUploadData.id
            const kind = fileUploadData.kind
            // console.log(imageUrl)
            const status = await changePermissions(drive, fileId)
            if (status) {
                const link = await getLink(drive, fileId)
                req.fileName = fileId
            }
            console.log(status)
        }
        else {
            throw "File was not uploaded check uploadFile function in FileUpload middleware!"
        }
        next()
    }
    catch (err) {
        console.log(err)
        return ERROR(res, "Error uploading file!")
    }
}



const pdfUploadMiddleWare = async (req, res, next) => {
    try {
        const fileName = req.files.Student_CV_File.name
        const data = req.files.Student_CV_File.data
        const mimeType = req.files.Student_CV_File.mimetype

        const OAuthClient = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
        OAuthClient.setCredentials({ refresh_token: REFRESH_TOKEN })
        const drive = google.drive({
            version: "v3",
            auth: OAuthClient
        })

        const fileUploadData = await uploadFile(data, fileName, mimeType, drive)
        if (fileUploadData) {
            console.log(fileUploadData)
            const fileId = fileUploadData.id
            const kind = fileUploadData.kind
            const status = await changePermissions(drive, fileId)
            if (status) {
                const link = await getLink(drive, fileId)
                console.log(link)
                req.fileName = fileId
            }
            console.log(status)
        }
        else {
            throw "File was not uploaded check uploadFile function in pdfUploadMiddleWare middleware!"
        }
        next()
    }
    catch (err) {
        console.log(err)
        return ERROR(res, "Error uploading file!")
    }
}

module.exports = { fileUploadMiddleware, pdfUploadMiddleWare }