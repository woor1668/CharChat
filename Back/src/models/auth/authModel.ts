import pool from "@config/db";

export interface User {
  uuid: string;
}

export const findUserByEmail = async (email: string, agent?: string): Promise<User | null> => {
  const conn = await pool.getConnection();
  const query = agent ? 
    "SELECT * FROM TB_USERS WHERE email = ?" :
    "SELECT * FROM TB_USERS WHERE email = ? AND AUTH_AGENT = ?";

  const params = agent ? [email] : [email, agent];
  const rows = await conn.query(query, params);
  conn.release();
  return rows.length ? rows[0] : null;
};

export const  createUser = async (name: string, email: string, agent: string, nickName?: string, pw?: string ): Promise<void> => {
  const conn = await pool.getConnection();
  const query = pw ? 
    "INSERT INTO TB_USERS (NAME, EMAIL, NICKNAME, PASSWORD, AUTH_AGENT) values (?, ?, ?, SHA2(?, 256), ?)" :
    "INSERT INTO TB_USERS (NAME, EMAIL, PASSWORD, AUTH_AGENT) values (?, ?, NULL, ?)";

  const params = pw ? [name, email, nickName, pw, agent] : [name, email, agent];

  await conn.query(query, params);
  conn.release();
};

export const loginUser = async (email: string, pw: string): Promise<User | null> => {
  const conn = await pool.getConnection();
  const rows = await conn.query("SELECT * FROM TB_USERS WHERE 1=1 AND EMAIL = ? AND PASSWORD = SHA2(?, 256)", [email, pw]);
  conn.release();
  return rows.length ? rows[0] : null;
};

export const authUser = async (uuid: string, token: string): Promise<void> => {
  const conn = await pool.getConnection();
  await conn.query("INSERT INTO TB_AUTH_USERS (UUID, TOKEN) values (?, ?)", [uuid, token]);
  conn.release();
};