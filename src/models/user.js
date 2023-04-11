import mongoose, { Schema } from "mongoose";

const userScheme = new Schema({
  email: String,
  passwordHash: String,
  photoUrl: String,
  fecha_creacion: {
    type: Date,
    default: Date.now,
  },
  bloquedo: {
    default: false,
    type: Boolean,
  }, //n cantidad de intentos
  allowsLocalStorage: {
    default: false,
    type: Boolean,
  }, //si el usuario tildó el check "permanecer conectado"
  theme_type: {
    type: String,
    enum: ["light", "dark"], //enumerador -> "ligth = 1" "dark = 2"
    default: "light",
  }, //user_preferences -> mobile
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Task",
    }, //almacena el id de las tareas en un array - populate
  ],
});

export default mongoose.model("User", userScheme); //todas las acciones o funciones que van a interactuar con la base
