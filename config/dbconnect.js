const config = require("./config")
const mysql = require("mysql")
const connect = mysql.createPool(config.databaseConfig)
module.exports = connect