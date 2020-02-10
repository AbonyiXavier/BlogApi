import Auth from "../middlewares/verifyToken";
import { create, update, remove } from "../controllers/article";

const router = require("express").Router();

router.post("/", Auth, create);
router
  .route("/:id")
  .put(Auth, update)
  .delete(Auth, remove);
export default router;
