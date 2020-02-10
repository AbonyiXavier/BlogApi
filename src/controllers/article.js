import articleValidation from "../Models/article";
import dbConnection from "../db/db";

const resultHandler = result => {};
export const create = async (req, res) => {
  try {
    const article = { userId: req.user.id, ...req.body };
    //validate article input
    const { error } = articleValidation(article);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    //insert article into db
    let result = await dbConnection.query(
      "INSERT INTO articles SET ?",
      article
    );

    return res.status(200).json({
      status: "success",
      data: {
        message: "article posted successfuully",
        articleId: result.insertId,
        articleTitle: article.title,
        userId: article.userId
      }
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      error: "Error saving into database.Try again"
    });
  }
};

export const update = async (req, res) => {
  const articleId = req.params.id;
  const article = { userId: req.user.id, ...req.body };
  //validate article input
  const { error } = articleValidation(article);
  if (error) {
    return res.status(400).json({
      status: "error",
      error: error.details[0].message
    });
  }
  try {
    const query = `UPDATE articles SET ? WHERE id = ? AND userId = ${req.user.id}`;
    const result = await dbConnection.query(query, [article, articleId]);
    if (result.changedRows === 0) {
      return res.status(400).json({
        status: "success",
        data: {
          message: "Restricted access or article with this id not found"
        }
      });
    }
    return res.status(200).json({
      status: "success",
      data: {
        message: "article update successfully",
        articleId,
        articleTitle: article.title
      }
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      error: `Cannot update article with title --${article.title}`
    });
  }
};

export const remove = async (req, res) => {
  try {
    const articleId = req.params.id;
    const query = `DELETE FROM articles WHERE id = ? AND userId = ${req.user.id}`;
    const result = await dbConnection.query(query, articleId);
    if (result.changedRows === 0) {
      return res.status(400).json({
        status: "success",
        data: {
          message: "Restricted access or article with this id not found"
        }
      });
    }
    return res.status(200).json({
      status: "success",
      data: {
        message: "article delete successfully"
      }
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      error: "Sorry cannot delete this from the database"
    });
  }
};
