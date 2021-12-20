const logger = require("serverloggerjs/logger")
const log = new logger(true)
const db = require("../Models/index")
const Company = db.companies

async function checkExists(id) {
    const companies = await Company.findAll({ 
        where: { Company_ID: id } 
    })
    // console.log(companies)
    return companies.length > 0 ? true : false
}

const createCompany = async (companyData) => {
    try {
        await Company.create(companyData)
        return true
    }
    catch (err) {
        log.error(err.toString())
        return false
    }
}

const getCompany = async (id) => {
    try {
        const status = await checkExists(id)
        if(!status) {
            throw "Error finding company detials"
        }
        else {
            let company = await Company.findOne({
                where: { id }
            })
            return company
        }
    }
    catch (err) {
        log.error(err.toString())
        return false
    }
}

const getAllCompany = async () => {
    try { 
        let companies = await Company.findAll({})
        return companies
    }
    catch (err) {
        log.error(err.toString())
        return false
    }
}

const updateCompany = async (data, id) => {
    try {
        const status = await checkExists(id)
        if(!status) {
            throw "Company doesn't exist"
        }
        else {
            const company = await Company.update(data, { where: { Company_ID: id } })
            return true
        }
    }
    catch (err) {
        log.error(err.toString())
        return false
    }
}

const deleteCompany = async (id) => {
    try {
        const status = await checkExists(id)
        if (!status) {
            throw "Error deleting company"
        }
        else {
            await Company.destroy({ where: { Company_ID: id } })
            return true
        }
    } catch (error) {
        log.error(error.toString())
        return false
    }
}

module.exports = {
    createCompany,
    getCompany,
    getAllCompany,
    updateCompany,
    deleteCompany
}