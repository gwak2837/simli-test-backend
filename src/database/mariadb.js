import { createPool } from 'mariadb'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { importSQL } from '../utils/common.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

const register = importSQL(__dirname, 'sql/register.sql')
const userByEmail = importSQL(__dirname, 'sql/userByEmail.sql')
const userById = importSQL(__dirname, 'sql/userById.sql')
const userByRegisterInput = importSQL(__dirname, 'sql/userByRegisterInput.sql')
const userDetailById = importSQL(__dirname, 'sql/userDetailById.sql')
const users = importSQL(__dirname, 'sql/users.sql')

const pool = createPool({
  host: process.env.MARIADB_HOST,
  port: process.env.MARIADB_PORT,
  user: process.env.MARIADB_USER,
  password: process.env.MARIADB_PASSWORD,
  connectionLimit: 5,
})

async function connectToMariaDB() {
  const conn = await pool.getConnection()
  await conn.query('USE simli_test')
  return conn
}

export async function getUserList() {
  const conn = await connectToMariaDB()

  const rows = await conn.query(await users)

  if (conn) conn.end()
  return rows
}

export async function getUserByEmail(email) {
  const conn = await connectToMariaDB()

  const rows = await conn.query(await userByEmail, [email])

  if (conn) conn.end()
  return rows
}

export async function getUserById(id) {
  const conn = await connectToMariaDB()

  const rows = await conn.query(await userById, [id])

  if (conn) conn.end()
  return rows
}

export async function getUserDetailById(id) {
  const conn = await connectToMariaDB()

  const rows = await conn.query(await userDetailById, [id])

  if (conn) conn.end()
  return rows
}

export async function registerUser({ email, passwordHash, name, phoneNumber, birth, address }) {
  const conn = await connectToMariaDB()

  await conn.query(await register, [email, passwordHash, name, phoneNumber, birth, address])

  const rows = await conn.query(await userByRegisterInput, [email, passwordHash, name])

  if (conn) conn.end()
  return rows
}
