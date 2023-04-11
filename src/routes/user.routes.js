import express from "express";
import { AddUser, Login } from "../controllers/user.controller";

const router = express.Router();

router.post("/users/add", AddUser);
router.get("/users/login", Login);

export default router;
