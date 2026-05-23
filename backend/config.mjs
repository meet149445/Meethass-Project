import dotenv from "dotenv";

dotenv.config();

const MONGODB= process.env.MONGODB;
const PORT = process.env.PORT;
const SECRET_KEY = process.env.SECRET_KEY;

export { MONGODB, PORT, SECRET_KEY };