import mongoose, { Schema } from "mongoose";

const taskScheme = new Schema({
  titulo: String,
  descripcion: {
    require: true,
    type: String,
  },
  fecha: {
    require: true,
    type: Date,
    default: Date.now,
  },
  urgente: Boolean,
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.model("Task", taskScheme); //todas las acciones o funciones que van a interactuar con la base
