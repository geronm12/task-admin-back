import mongoose from "mongoose";

mongoose.set("strictQuery", true);

function connect() {
  mongoose
    .connect(
      process.env.DB_CONNECTION
    )
    .then((res) => console.log("conectado correctamante a la base de mongo"))
    .catch((err) => console.log(err));
}

export default connect;
