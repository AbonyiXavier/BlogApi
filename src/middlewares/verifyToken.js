import jwt from "jsonwebtoken";
import dbConnection from "../db/db";

const Auth = (req, res, next) => {
  const token = req.header("auth-token");

  if (!token) {
    // return res.status(401).send("Access Denied");
    return res.status(401).json({
      status: "failure",
      message: "No access token provided!"
    });
  }
  if (token) {
    try {
      jwt.verify(token, process.env.TOKEN_SECRET, function(err, decoded) {
        req.user = decoded;
      });
      next();
      // console.log(req.user);
    } catch (error) {
      return res.status(400).send({
        status: "failure",
        message: "Invalid Token!"
      });
    }
  }
};

export const userRestriction = async (req, res, next) => {
  let articleId = req.params.id;
  const article = "SELECT userId FROM articles WHERE id = ?";
  let result = await dbConnection.query(article, articleId);
  if (result.length === 0) {
    return res.status(404).json({
      status: "error",
      error: "Article not found"
    });
  }

  if (result[0].userId !== req.user.id) {
    return res.status(403).json({
      status: "error",
      error: "Access to modify not allowed"
    });
  }
  next();
};
export default Auth;
