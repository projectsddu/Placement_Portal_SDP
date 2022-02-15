const SkillsAndAchievmentsController = require("../Controllers/SkillsAndAchievmentsController")
const router = require('express').Router()
const EmptyFieldCheck = require("../Middlewares/General/EmptyFieldCheck")

router.post("/addSkillsAndAchievements", SkillsAndAchievmentsController.createSkillsAndAchievements)
router.get("/getAllSkillsAndAchievements", SkillsAndAchievmentsController.getAllSkillsAndAchievements)
router.get("/getSkillsAndAchievements/:id", SkillsAndAchievmentsController.getSkillsAndAchievements)
router.post("/updateSkillsAndAchievements/:id", SkillsAndAchievmentsController.updateSkillsAndAchievements)
router.post("/deleteSkillsAndAchievements/:id", SkillsAndAchievmentsController.deleteSkillsAndAchievements)

module.exports = router