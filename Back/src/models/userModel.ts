import pool from "@config/db";

export interface User {
  uuid: string;
  lang: string;
}

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const conn = await pool.getConnection();
  const rows = await conn.query("SELECT * FROM TB_USERS WHERE email = ?", [email]);
  conn.release();
  return rows.length ? rows[0] : null;
};

export const createUser = async (name: string, id: string, email: string, pw: string): Promise<void> => {
  const conn = await pool.getConnection();
  await conn.query("INSERT INTO TB_USERS (NAME, ID, EMAIL, PASSWORD) values (?, ?, ?, SHA2(?, 256))", [name, id, email, pw]);
  conn.release();
};

export const loginUser = async (eid: string, pw: string): Promise<User | null> => {
  const conn = await pool.getConnection();
  const rows = await conn.query("SELECT * FROM TB_USERS WHERE 1=1 AND (ID = ? OR EMAIL = ?) AND PASSWORD = SHA2(?, 256)", [eid, eid, pw]);
  conn.release();
  return rows.length ? rows[0] : null;
};

export const authUser = async (uuid: string, token: string): Promise<void> => {
  const conn = await pool.getConnection();
  await conn.query("INSERT INTO AUTH_USERS (UUID, TOKEN) values (?, ?)", [uuid, token]);
  conn.release();
};