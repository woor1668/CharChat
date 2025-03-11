import pool from "@config/db";

export interface info {
    nickName: string;
    profileUrl: string;
}

export const selectInfo = async (uuid: string): Promise<info | null> => {
    const conn = await pool.getConnection();
    const rows = await conn.query("SELECT NICK_NAME as nickName, PROFILE_URL as profileUrl FROM TB_USERS WHERE UUID = ?", [uuid]);
    conn.release();
    return rows.length ? rows[0] : null;
  };