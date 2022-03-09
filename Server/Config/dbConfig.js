module.exports = {
    HOST: process.env.NODE_ENV == "production" ? 'sql6.freemysqlhosting.net' : "localhost",
    USER: process.env.NODE_ENV == "production" ? 'sql6477012' : "root",
    PASSWORD: process.env.NODE_ENV == "production" ? 'rvsiwZZ5MQ' : "",
    DB: process.env.NODE_ENV == "production" ? 'sql6477012' : "sequelize_testing",
    DIALECT: 'mysql',
}