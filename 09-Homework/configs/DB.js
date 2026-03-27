const mysql = require("mysql2/promise")

const pool = mysql.createPool({
    host:"localhost",
    user:"root",
    database:"coffee",
    password:"oumussa@2292005"
})

module.exports=pool;