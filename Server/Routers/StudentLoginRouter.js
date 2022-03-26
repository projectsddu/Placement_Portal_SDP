const StudentLoginController = require("../Controllers/StudentLoginController")
const router = require('express').Router()
const Authenticate = require("../Middlewares/StudentLogin/Authenticate")

router.post("/login", StudentLoginController.loginUser)
router.post("/changePasswordFirstTime", StudentLoginController.changePasswordFirstTime)
router.post("/changePassword", [Authenticate], StudentLoginController.changePassword)

module.exports = router