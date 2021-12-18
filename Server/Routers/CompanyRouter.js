const CompanyController = require('../controllers/CompanyController.js')
const router = require('express').Router()

router.post("/addCompany", CompanyController.addCompany)
router.get("/getCompany/:id", CompanyController.getCompany)
router.get("/getCompany", CompanyController.getAllCompany)
router.post("/updateCompany/:id", CompanyController.updateCompany)
router.post("/deleteCompany/:id", CompanyController.deleteCompany)


module.exports = router