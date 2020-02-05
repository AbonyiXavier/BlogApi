import express from "express";
import cors from "cors";
import mysql from "mysql";
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

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

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server Started at Port : ${PORT}`);
});

export default server;
