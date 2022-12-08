//FIRST REQUIRE THE MYSQL MODULE THAT WE HAVE INSTALLED JUST AT THE BEGGINING IT HAS TO BE INSIDE OF NODE-MODULES.
const mysql = require('mysql');

//require the .env file:
require('dotenv').config()


//CREATE THE CONNECTION TO THE DATABASE
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE //Name of the database
});



//THEN EXPORT THE DB CONNECTION
module.exports = db;









