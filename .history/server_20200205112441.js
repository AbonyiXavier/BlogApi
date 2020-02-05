import express from "express";
import cors from "cors";
// import mysql from "mysql";
import signupRoute from "./src/controllers/signup";
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.post("/api/v1/signup", signupRoute);

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  console.log(`Server Started at Port : ${PORT}`);
});

export default server;
