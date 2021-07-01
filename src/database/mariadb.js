import { createPool } from 'mariadb'

const pool = createPool({
  host: process.env.MARIADB_HOST,
  port: process.env.MARIADB_PORT,
  user: process.env.MARIADB_USER,
  password: process.env.MARIADB_PASSWORD,
  connectionLimit: 5,
})

export async function getUserList() {
  const conn = await pool.getConnection()
  await conn.query('USE simli_test')
  const rows = await conn.query('SELECT * FROM user')

  if (conn) conn.end()
  return rows
}

export async function getUserByEmail(email) {
  const conn = await pool.getConnection()
  await conn.query('USE simli_test')
  const rows = await conn.query(`SELECT id, password_hash FROM user WHERE email='${email}'`)

  if (conn) conn.end()

  return rows
}

export async function registerUser(email, passwordHash, name) {
  const conn = await pool.getConnection()
  await conn.query('USE simli_test')

  await conn.query(
    `INSERT INTO user (email, password_hash, name) VALUES ('${email}','${passwordHash}','${name}') RETURNING id`
  )

  const rows = await conn.query(
    `SELECT id FROM user WHERE email='${email}' and password_hash='${passwordHash}' and name='${name}'`
  )

  if (conn) conn.end()

  return rows
}
