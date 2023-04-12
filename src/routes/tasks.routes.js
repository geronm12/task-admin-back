import express from "express";
import {
  GetAllTasks,
  AddTask,
  GetById,
  UpdateById,
  DeleteTask,
} from "../controllers/task.controller";
import { Authenticate } from "../helpers/token.helper";

const router = express.Router();

router.post("/tasks/add", Authenticate, AddTask);

router.get("/tasks", Authenticate, GetAllTasks);

router.get("/tasks/:id", Authenticate, GetById);

router.put("/tasks/:id", Authenticate, UpdateById);

router.delete("/tasks/:id", Authenticate, DeleteTask);

export default router;
