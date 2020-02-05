import express from "express";
import cors from "cors";
// import mysql from "mysql";
import signupRoute from "./src/controllers/signup";
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// var dbConnection = mysql.createConnection({
//   host: process.env.HOST,
//   user: process.env.USER,
//   password: process.env.PASSWORD,
//   database: process.env.DB
// });
// dbConnection.connect(err => {
//   if (!err) {
//     console.log("database connected!!!");
//   } else {
//     console.log(`Debug me i have errors!!!!! ${err}`);
//   }
// });

app.post("/api/v1/signup", signupRoute);

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  console.log(`Server Started at Port : ${PORT}`);
});

export default server;
