import mongoose from "mongoose";

mongoose.set("strictQuery", true);

function connect() {
  mongoose
    .connect(
      "mongodb+srv://glpz01:tVTSyj83srWsf1CM@cluster0.h97siqf.mongodb.net/test"
    )
    .then((res) => console.log("conectado correctamante a la base de mongo"))
    .catch((err) => console.log(err));
}

export default connect;
