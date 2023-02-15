const mysql = require('mysql2');
const  {DB_HOST,DB_USER,DB_PASSWORD,DB_DATABASE,DB_PORT} = require ("../config/constants.js")

const dbConfig = {
  host: DB_HOST,
  user: DB_USER,
  password:DB_PASSWORD,
  database: DB_DATABASE,
  port:DB_PORT,
  // ssl: {
  //   rejectUnauthorized: false,
  // }
}

const connection = mysql.createConnection(dbConfig);

connection.connect((err, connection) => {
    if (err) {
        console.log(err)
        console.log("Cannot connect database")
    } else {
        console.log("Database is connected")
    }
})

connection.on('error', (err) => {
    console.log(err)
})

module.exports = connection.promise();