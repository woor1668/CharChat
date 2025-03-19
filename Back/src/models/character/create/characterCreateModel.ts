import pool from "@config/db";

export interface Steps {
  sid: string;
  label: string;
  path: string;
  isRequired: boolean;
}

export const selectStep = async (): Promise<Steps | null> => {
  const conn = await pool.getConnection();
  const rows = await conn.query("SELECT label, path, is_required as isRequired FROM TB_CHARACTER_STEPS ORDER BY SORT_ORDER", []);
  conn.release();
  return rows.length ? rows : null;
};