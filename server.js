import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import signup from "./src/controllers/signup";
import article from "./src/routes/article";
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());

//routes
app.post("/api/v1/signup", signup);
app.use("/api/v1/article", article);

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  console.log(`Server Started at Port : ${PORT}`);
});

export default server;
