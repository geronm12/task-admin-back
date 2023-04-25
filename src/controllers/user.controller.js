import { Encrypt, Compare } from "../helpers/password.helper";
import UserScheme from "../models/user";
import { UploadPicture } from "./cloudinary.controller";

const LOGIN_ERROR_MESSAGE = "El usuario o la contraseña no coinciden.";
const base_error_object = {
  ok: false,
  error_msg: LOGIN_ERROR_MESSAGE,
};
//&& donde ambos son incorrectos
//user controller sólo se encarga de administrar el usuario
//CRUD -> Create Read Udate Delete -> Crear Leer Modificar Eliminar
//Las respoonsabilidades de cada archivo bien segmentada
async function AddUser(req, res) {
  try {
    const { email, password, photoUrl } = req.body;

    const passwordHash = await Encrypt(password);
    console.log(passwordHash);
    const newUser = await UserScheme.create({
      email,
      photoUrl,
      passwordHash,
    });

    return res.json({
      ok: true,
      data_added: newUser,
    });
  } catch (ex) {
    console.log(ex);
    return res.status(400).json({
      ok: false,
      message: ex,
    });
  }
}

async function Login(req, res) {
  try {
    const { email, password } = req.body;
    const userLogged = await UserScheme.findOne({ email }).populate(
      "tasks",
      "titulo descripcion urgente"
    );

    if (!userLogged) return res.status(400).json(base_error_object);

    const passwordCheck = await Compare(password, userLogged.passwordHash);

    if (!passwordCheck) return res.status(400).json(base_error_object);

    const token = userLogged.generateAccesToken();

    return res.status(200).json({
      ok: true,
      user: userLogged,
      token: token,
    });
  } catch (ex) {
    return res.status(400).json({
      ok: false,
      message: ex,
    });
  }
}

async function UpdateUser(req, res) {
  try {
    const { id } = req.params;
    const photo = req.files["file"][0];
    const { data } = req.body;
    const { theme } = JSON.parse(data);
    console.log(photo);
    console.log(theme);
    const { secure_url } = await UploadPicture(photo);
    const response = await UserScheme.findByIdAndUpdate(id, {
      $set: {
        photoUrl: secure_url,
        theme_type: theme,
      },
    });

    response.photoUrl = secure_url;

    if (response) {
      return res.status(200).json({
        ok: true,
        user: response,
      });
    }

    return res.status(400).json({
      ok: false,
      err: "error al modificar el usuario",
    });
  } catch (err) {
    console.log(err);
  }
}

export { AddUser, Login, UpdateUser };
