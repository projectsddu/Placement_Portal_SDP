const dbConfig = require("../Config/dbConfig")
const { Sequelize, DataTypes } = require("sequelize")
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.DIALECT,
    logging: false
})
sequelize.authenticate()
    .then(() => {
        console.log("Connected")
    })
    .catch((err) => {
        console.log("Error:" + err)
    })

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

db.students = require("./StudentModel")(sequelize, DataTypes)
db.announcements = require("./AnnouncementModel")(sequelize, DataTypes)
db.companies = require("./CompanyModel")(sequelize, DataTypes)
db.userLogin = require("./UserLoginModel")(sequelize, DataTypes)
db.student_placements = require("./StudentPlacementModel")(sequelize, DataTypes)
db.student_internships = require("./StudentInternshipModel")(sequelize, DataTypes)
db.branches = require("./BranchModel")(sequelize, DataTypes)
db.comments = require("./CommentModel")(sequelize, DataTypes)
db.subscribes = require("./AnnouncementSubscribe")(sequelize, DataTypes)
db.LoginTokens = require("./LoginTokensModel")(sequelize, DataTypes)

db.sequelize.sync({ force: false }).then(() => {
    console.log("Resyncing Done.....")
})

module.exports = db
