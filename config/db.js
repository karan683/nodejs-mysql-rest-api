const mysql = require('mysql2');

const pool = mysql.createPool({
    host:"localhost",
    database:"users_detail",
    user:"root",
    password:"Password@123"
});

module.exports=pool.promise();