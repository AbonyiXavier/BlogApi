import express from "express";
import cors from "cors";
import signup from "./src/controllers/signup";
import signin from "./src/controllers/signin";
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.post("/api/v1/signup", signup);
app.post("/api/v1/signin", signin);

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  console.log(`Server Started at Port : ${PORT}`);
});

export default server;
