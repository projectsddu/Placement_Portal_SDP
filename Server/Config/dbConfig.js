module.exports = {
    HOST: process.env.NODE_ENV == "production" ? 'sql6.freemysqlhosting.net' : "localhost",
    USER: process.env.NODE_ENV == "production" ? 'sql6478566' : "root",
    PASSWORD: process.env.NODE_ENV == "production" ? 'uf67sShcag' : "",
    DB: process.env.NODE_ENV == "production" ? 'sql6478566' : "sequelize_testing",
    DIALECT: 'mysql',
}