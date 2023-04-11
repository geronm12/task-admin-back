import express from "express";
import {
  GetAllTasks,
  AddTask,
  GetById,
  UpdateById,
  DeleteTask,
} from "../controllers/task.controller";

const router = express.Router();

router.post("/tasks/add", AddTask);

router.get("/tasks", GetAllTasks);

router.get("/tasks/:id", GetById);

router.put("/tasks/:id", UpdateById);

router.delete("/tasks/:id", DeleteTask);

export default router;
