import pool from "../config/db";

export const saveRefreshToken = async (
  user_id: number,
  token: string,
  expires_at: Date,
) => {
  const query = `INSERT INTO auth.refresh_tokens(user_id, token, expires_at) VALUES ($1,$2,$3) `;
  await pool.query(query, [user_id, token, expires_at]);
};

export const findRefreshToken = async (token: string) => {
  const query = `SELECT * FROM auth.refresh_tokens where token = $1 AND is_revoked = false`;
  const result = await pool.query(query, [token]);
  return result.rows[0];
};

export const revokeRefreshToken = async (token: string) => {
  const query = `UPDATE auth.refresh_tokens SET is_revoked = true WHERE token = $1`;
  await pool.query(query, [token]);
};
