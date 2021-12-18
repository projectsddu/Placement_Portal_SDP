const dbConfig = require("../Config/dbConfig")
const { Sequelize, DataTypes } = require("sequelize")
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.DIALECT,
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

db.sequelize.sync({ force: true }).then(() => {
    console.log("Resyncing Done.....")
})

module.exports = db
