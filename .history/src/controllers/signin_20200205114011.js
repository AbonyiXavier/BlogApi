import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dbConnection from "../db/db";
import signinValidation from "../Models/Signin";

function signin(req, res) {
  const { email, password } = req.body;
  const { error } = signinValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const userEmail = "SELECT * FROM users WHERE email = ?";
  dbConnection.query(userEmail, [email], (error, results, fields) => {
    console.log(results);
    if (error) {
      res.json({
        status: false,
        message: "please debug me!!!"
      });
    } else {
      if (results.length > 0) {
        const match = bcrypt.compareSync(password, results[0].password);
        if (match) {
          const token = jwt.sign(
            { id: results[0].id, isAdmin: results[0].isAdmin },
            process.env.TOKEN_SECRET,
            {
              // expiresIn: "3600s" // 1min
            }
          );
          res
            .header("auth-token", token)
            .status(201)
            .json({
              status: "success",
              message: "logged in successfully",
              token
              // user
            });
        } else {
          res.json({
            status: "error",
            message: "Email and password does not match"
          });
        }
      } else {
        res.json({
          status: "error",
          message: "Email does not exits"
        });
      }
    }
  });
}
export default signin;
