import pool from "@config/db";

export interface info {
    nickName: string;
    profileUrl: string;
    BIO: string;
}

export const selectInfo = async (uuid: string): Promise<info | null> => {
    const conn = await pool.getConnection();
    const rows = await conn.query(
        `SELECT 
            u.NICK_NAME as nickName, 
            p.PROFILE_URL as profileUrl,
            p.BIO 
        FROM TB_USERS u
        LEFT JOIN TB_USER_PROFILES p ON u.UUID = p.UUID
        WHERE u.UUID = ?`, 
        [uuid]
    );
    conn.release();
    return rows.length ? rows[0] : null;
};
