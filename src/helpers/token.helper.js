import jwt from "jsonwebtoken";

function Authenticate(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res.status(404).json({
      ok: false,
      error_msg: "Usuario no autorizado",
    });

  jwt.verify(token, process.env.SECRET_KEY, (error, payload) => {
    if (error) {
      return res.status(404).json({
        ok: false,
        error_msg: "Usuario no autorizado dentro de la verificacion",
      });
    }
    req.payload = payload;
    next();
  });
}

export { Authenticate };
