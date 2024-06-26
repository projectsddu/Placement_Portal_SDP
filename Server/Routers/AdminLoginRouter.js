const router = require('express').Router()
const multer = require('multer');

const AdminAuthenticate = require("../Middlewares/Admin/AdminAuthenticate")
const AdminLoginController = require("../Controllers/AdminLoginController")

router.post("/login", AdminLoginController.login)
router.post("/changePassword", [AdminAuthenticate.AdminAuthenticate], AdminLoginController.changePassword)

module.exports = router