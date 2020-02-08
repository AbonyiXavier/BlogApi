import Auth, { userRestriction } from "../middlewares/verifyToken";
import { create, update, remove } from "../controllers/article";

const router = require("express").Router();

router.post("/", Auth, create);
router
  .route("/:id")
  .put(Auth, userRestriction, update)
  .delete(Auth, userRestriction, remove);
export default router;
