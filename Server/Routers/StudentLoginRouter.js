const StudentLoginController = require("../Controllers/StudentLoginController")
const router = require('express').Router()
const Authenticate = require("../Middlewares/StudentLogin/Authenticate")

router.post("/login", StudentLoginController.loginUser)

module.exports = router