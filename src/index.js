import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";

import taskRouter from "./routes/tasks.routes";
import userRouter from "./routes/user.routes";
import connect from "./db/db";

dotenv.config();
const API_PREFIX = "/api";

const app = express();
app.use(morgan("start"));
app.use(express.json()); //Convierte el body en json
app.use(cors());
app.get("/", (req, res) => {
  res.send("<h1>Estamos en index</h1>");
});

app.use(API_PREFIX, taskRouter);
app.use(API_PREFIX, userRouter);

connect();

app.listen(process.env.PORT, () => {
  console.log("Servidor ejecutandose en el puerto: " + process.env.PORT);
});


 