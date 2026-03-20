const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "oumussa@2292005",
  database: "coffee",
});

module.exports= pool;