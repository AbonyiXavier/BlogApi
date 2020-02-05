const mysql = require("mysql");
require("dotenv").config();

var dbConnection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB
});
dbConnection.connect(err => {
  if (!err) {
    console.log("database connected!!!");
  } else {
    console.log(`Debug me i have errors!!!!! ${err}`);
  }
});
export default dbConnection;
