import pool from "@config/db";

export interface info {
  uuid: string;
  ai: number;
  apiKey: string;
}

export const selectInfo = async (uuid: string): Promise<info | null> => {
    const conn = await pool.getConnection();
    const rows = await conn.query("SELECT NAME, EMAIL FROM TB_USERS WHERE UUID = ?", [uuid]);
    conn.release();
    return rows.length ? rows[0] : null;
  };
  
  export const updateInfo = async (uuid: string, lang: string, isPw: boolean, pw: string): Promise<void> => {
    const conn = await pool.getConnection();
    if(isPw){
      await conn.query(`
            UPDATE TB_USERS 
            SET LANG = ?
              , PASSWORD = SHA2(?, 256)
            WHERE UUID = ?
        `, [lang, pw, uuid]);
    }else{
      await conn.query(`
            UPDATE TB_USERS 
            SET LANG = ?
            WHERE UUID = ?
        `, [lang, uuid]);
    }

    conn.release();
};