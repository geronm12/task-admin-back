import express from "express";
import morgan from "morgan";
import taskRouter from "./routes/tasks.routes";
import userRouter from "./routes/user.routes";
import connect from "./db/db";

const API_PREFIX = "/api";

const app = express();

app.use(morgan("start"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Estamos en index</h1>");
});

app.use(API_PREFIX, taskRouter);
app.use(API_PREFIX, userRouter);

connect();

app.listen(process.env.PORT || 5000, () => {
  console.log("Server ex port: 5000");
});
