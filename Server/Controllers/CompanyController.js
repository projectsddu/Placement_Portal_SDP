const db = require("../Models")
const logger = require("serverloggerjs/logger")
const log = new logger(true)
const Companies = db.companies
const CompanyService = require("../Services/CompanyService")
const StudentModel = require("../Models/StudentModel")

async function checkExists(id) {
    const companies = await Companies.findAll({ where: { companyId: id } })
    console.log(companies)
    return companies.length > 0 ? true : false
}

const addCompany = async (req, res) => {

    try {
        // Data must be in the format defined in models
        const data = req.body
        const companyStatus = await CompanyService.createCompany(data)
        if(companyStatus)
        {
            return res.json({ data: "Company Created", status: true })
        }
        else {
            throw "Error from createCompany controller"
        }
    }
    catch (err) {
        log.error(err.toString())
        return res.json({ data: "Error from createCompany controller", status: false })
    }

}

const getCompany = async (req, res) => {

    try {
        const companyId = req.params.id
        // console.log(companyId)
        let company = await CompanyService.getCompany(companyId)
        if(company) {
            return res.json({ status: company.length == 0 ? false : true, data: company.length == 0 ? "Company Not Found!" : company })
        }
        else {
            throw "Error in getCompany"
        }
    }
    catch (err) {
        log.error(err.toString())
        return res.json({ status: false, data: "Error company not found!" })
    }

}

const getAllCompany = async (req, res) => {

    try {
        let companies = await CompanyService.getAllCompany()
        if (companies) {
            return res.json({ status: companies.length == 0 ? false : true, data: companies.length == 0 ? "No Student data!" : companies })
        }
        else {
            throw "Error in getAllCompany"
        }
    }
    catch (err) {
        log.error(err.toString())
        return res.json({ status: false, data: "Error finding companies!!" })
    }

}

const updateCompany = async (req, res) => {
    try {
        const id = req.params.id
        const company = await CompanyService.updateCompany(req.body, id)
        if(company) {
            return res.json({ status: true, data: "Company Updated!!" })
        }
        else { 
            return res.json({ status: false, data: "Error updating Company data !!!" })
        }
    }
    catch (err) {
        log.error(err.toString())
        return res.json({ status: false, data: "Error updating company!!" })
    }
}

const deleteCompany = async (req, res) => {
    try {
        let id = req.params.id
        const status = await CompanyService.deleteCompany(id)
        if(status) {
            return res.json({ status: true, data: "Company Deleted Successfully!!" })
        }
        else {
            throw "Error deleting company"
        }
    }
    catch (err) {
        if (err instanceof Error) {
            log.error(err.toString())
            return res.json({ status: false, data: "Error Deleting company!!" })
        }
        else {
            return res.json({ status: false, data: err.toString() })

        }
    }
}

module.exports = {
    addCompany,
    getAllCompany,
    getCompany,
    updateCompany,
    deleteCompany
}