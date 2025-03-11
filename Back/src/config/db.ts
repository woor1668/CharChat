import mariadb from "mariadb";
import env from "./config";

const pool = mariadb.createPool({
  host: env.DB_HOST,
  port: 3316,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  connectionLimit: 5,
});

export default pool;
