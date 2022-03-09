const db = require("../Models")
const multer = require('multer');
const logger = require("serverloggerjs/logger")
const log = new logger(true)
const ReportService = require("../Services/ReportService");
const ResponseService = require("../Services/ResponseService")
const OK = ResponseService.OK
const ERROR = ResponseService.ERROR
const RESP = ResponseService.RESP

const getPlacementReportByBatchYear = async (req, res) => {

    try
    {
        let data = req.body
        let batch_year = req.body.Passed_out_year
        console.log(data)
        
        let placements = await ReportService.getPlacementReportByBatchYear(batch_year)
        console.log(placements)
        if(placements)
        {
            return RESP(res, placements.length == 0 ? false : true, placements.length == 0 ? "No placements data!" : placements)
        }
        else {
            throw "Error in getAllPlacements in reports"
        }

    }
    catch (e) {
        log.error(e.toString())
        // console.log(e.toString());
        // return ERROR(res, "Oops! some unknown error occured getting placements!")
        return ERROR(res, e.toString())
        // res.json({ status: false, data: e.toString() })
    }
}

const multiplePlacements = async (req, res) => {
    try
    {
        let data = req.body
        let batch_year = req.body.Passed_out_year

        let placements = await ReportService.multiplePlacements(batch_year)

        if(placements)
        {
            return RESP(res, placements.length == 0 ? false : true, placements.length == 0 ? "No placements data!" : placements)
        }
        else {
            throw "Error in multiplePlacements in reports"
        }

    }
    catch (e) {
        log.error(e.toString())
        // console.log(e.toString());
        // return ERROR(res, "Oops! some unknown error occured getting placements!")
        return ERROR(res, e.toString())
        // res.json({ status: false, data: e.toString() })
    }

}

const placedStudentsByCompany = async (req, res) => {
    try
    {
        let data = req.body
        let batch_year = req.body.Passed_out_year

        if(batch_year.toLowerCase() == "all")
        {
            batch_year = "1"
        }
        
        let placements = await ReportService.placedStudentsByCompany(batch_year)

        if(placements)
        {
            return RESP(res, placements.length == 0 ? false : true, placements.length == 0 ? "No placements data!" : placements)
        }
        else {
            throw "Error in multiplePlacements in reports"
        }
    }
    catch (e) {
        log.error(e.toString())
        // console.log(e.toString());
        // return ERROR(res, "Oops! some unknown error occured getting placements!")
        return ERROR(res, e.toString())
        // res.json({ status: false, data: e.toString() })
    }
}

module.exports = {
    getPlacementReportByBatchYear,
    multiplePlacements,
    placedStudentsByCompany
}