import { createPool } from 'mariadb'
import { createHash } from 'crypto'

const pool = createPool({
  host: process.env.MARIADB_HOST,
  port: process.env.MARIADB_PORT,
  user: process.env.MARIADB_USER,
  password: process.env.MARIADB_PASSWORD,
  connectionLimit: 5,
})

async function GetUserList() {
  const conn = await pool.getConnection()
  conn.query('USE nodejs_test')
  const rows = await conn.query('SELECT * FROM users')
  if (conn) conn.end()
  return rows
}

async function GetUser(userid) {
  const conn = await pool.getConnection()
  await conn.query('USE nodejs_test')

  console.log('userid ', userid)

  const rows = await conn.query(`SELECT * FROM users where user_id='${userid}'`)
  if (conn) conn.end()
  return rows
}

async function SignupUser(id, pw, name) {
  const conn = await pool.getConnection()
  await conn.query('USE nodejs_test')

  console.log('userid', id)
  console.log('userpw', pw)

  pw = createHash('sha512').update(pw).digest('base64')

  console.log('userpw', pw)
  console.log('username', name)

  await conn.query(
    `INSERT INTO users(user_id,user_pw,user_name) VALUES ('${id}','${pw}','${name}')`
  )
  if (conn) conn.end()
}

export const getUserList = GetUserList
export const getUser = GetUser
export const signupUser = SignupUser
// 다른 파일에서 GetUserList 를  getUserList로 불러서 쓸수 있음
