import bcrypt from "bcrypt";
//salt - sal //se encripta y se concatena al password hasheado
//naranja ->
const saltRounds = 10; //cantidad de vueltas que de el hash 1 vuelta
//.then   texto plano - saltRounds
async function Encrypt(password) {
  return await bcrypt.hash(password, saltRounds);
}

async function Compare(password, hash) {
  return await bcrypt.compare(password, hash);
}

export { Compare, Encrypt };
