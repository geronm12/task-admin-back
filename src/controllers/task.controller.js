import TaskScheme from "../models/task";
import UserScheme from "../models/user";

const maxPageDocs = 5;

async function AddTask(req, res) {
  try {
    const { user_id } = req.body; //traer el token, desencriptar el token y obtener el usuario_id
    const newTask = await TaskScheme.create(req.body); //me devuelve el documento con el objectId asignado
    const user = await UserScheme.findById(user_id);
    user.tasks.push({ _id: newTask._id });
    user.save();
    return res.json({
      ok: true,
      data_added: newTask,
    });
  } catch (ex) {
    return res.status(400).json({
      ok: false,
      message: ex,
    });
  }
}

async function GetAllTasks(req, res) {
  try {
    const { page } = req.query;
    //de dónde obtenemos el user_id
    //token
    const results = await TaskScheme.find()
      .populate("user_id", "email photoUrl")
      .skip(page * maxPageDocs)
      .limit(maxPageDocs);
    return res.json({
      ok: true,
      data: results,
    });
  } catch (ex) {
    console.log(ex);
    return res.status(400).json({
      ok: false,
      error: ex,
    });
  }
}

async function GetById(req, res) {
  console.log(req);
  const { id } = req.params;

  try {
    const task = await TaskScheme.findById(id).populate("user_id", "email photoUrl");
    if (task) {
      return res.status(201).json({
        ok: true,
        data: task,
      });
    }
  } catch (ex) {
    return res.status(500).json({
      ok: false,
      error: ex,
    });
  }
}

async function UpdateById(req, res) {
  const { id } = req.params;
  console.log(req.body);
  try {
    const updatedTask = await TaskScheme.findByIdAndUpdate(id, req.body);

    if (updatedTask) {
      return res.status(201).json({
        ok: true,
        data: updatedTask,
      });
    }
  } catch (ex) {
    return res.status(500).json({
      ok: false,
      error: ex,
    });
  }
}

async function DeleteTask(req, res) {
  try {
    const { id } = req.params;
    const result = await TaskScheme.findByIdAndDelete(id);
    if (result) {
      return res.status(400).json({
        ok: true,
        data: result,
      });
    }
  } catch (ex) {
    return res.status(500).json({
      ok: false,
      error: ex,
    });
  }
}

export { AddTask, GetAllTasks, GetById, UpdateById, DeleteTask };
