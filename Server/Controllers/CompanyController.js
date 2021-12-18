const db = require("../Models")
const logger = require("serverloggerjs/logger")
const log = new logger(true)
const Companies = db.companies

async function checkExists(id) {
    const companies = await Companies.findAll({ where: { companyId: id } })
    console.log(companies)
    return companies.length > 0 ? true : false
}

const addCompany = async (req, res) => {

    try {
        // Data must be in the format defined in models
        const data = req.body
        const company = await Companies.create(data)
        return res.json({ data: "Company Created", status: true })
    }
    catch (err) {
        log.error(err.toString())
        return res.json({ data: "Error creating user", status: false })
    }

}

const getCompany = async (req, res) => {

    try {
        const companyId = req.params.id
        console.log(companyId)
        const company = await Companies.findAll({ where: { "Company_ID": companyId } })
        return res.json({ status: company.length == 0 ? false : true, data: company.length == 0 ? "Company Not Found!" : company })
    }
    catch (err) {
        log.error(err.toString())
        return res.json({ status: false, data: "Error company not found!" })
    }

}

const getAllCompany = async (req, res) => {

    try {
        const company = await Companies.findAll({})
        return res.json({ status: true, data: company })
    }
    catch (err) {
        log.error(err.toString())
        return res.json({ status: false, data: "Error finding companies!!" })
    }

}

const updateCompany = async (req, res) => {
    try {
        const id = req.params.id
        const company = await Companies.update(req.body, { where: { Company_ID: id } })
        return res.json({ status: true, data: "Company Updated!!" })
    }
    catch (err) {
        log.error(err.toString())
        return res.json({ status: false, data: "Error updating company!!" })
    }
}

const deleteCompany = async (req, res) => {
    try {
        let id = req.params.id
        if (!checkExists(id)) {
            throw "Company Does not exists!"
        }
        console.log(id)
        await Companies.destroy({ where: { Company_ID: id } })
        return res.json({ status: true, data: "Company Deleted Successfully!!" })
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