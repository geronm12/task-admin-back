import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";

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

//override -> sobreescritura de métodos
userScheme.set("toJSON", {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret.passwordHash;
    delete ret._id;
    delete ret.tasks;
    delete ret.__v;
    delete ret.bloquedo;
  },
});

userScheme.methods.generateAccesToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
  return token;
};

export default mongoose.model("User", userScheme); //todas las acciones o funciones que van a interactuar con la base
