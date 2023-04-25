import { AddUser, Login, UpdateUser } from "../controllers/user.controller";
import { Authenticate } from "../helpers/token.helper";
import express from "express";
import multer from "multer";

const router = express.Router();

const upload = multer({
  storage: multer.diskStorage({}),
}).fields([
  { name: "file", maxCount: 1 },
  { name: "data", maxCount: 1 },
]);

router.post("/users/add", AddUser);
router.post("/users/login", Login);
router.put("/users/:id", [Authenticate, upload], UpdateUser);

export default router;
