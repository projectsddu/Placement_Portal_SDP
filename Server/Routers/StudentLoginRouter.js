const StudentLoginController = require("../Controllers/StudentLoginController")
const router = require('express').Router()

router.post("/login", StudentLoginController.loginUser)

module.exports = router