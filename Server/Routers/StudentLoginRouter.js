const StudentLoginController = require("../Controllers/StudentLoginController")
const router = require('express').Router()
const Authenticate = require("../Middlewares/StudentLogin/Authenticate")

router.post("/login", [Authenticate], StudentLoginController.loginUser)

module.exports = router