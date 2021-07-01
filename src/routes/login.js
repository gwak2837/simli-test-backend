import bcrypt from 'bcryptjs'
import { Router } from 'express'
import { getUserByEmail } from '../database/mariadb.js'
import { generateJWT } from '../utils/jwt.js'

const { compare } = bcrypt
const router = Router()

router.post('/', async (req, res) => {
  const email = req.body.email
  const password = req.body.password

  const rows = await getUserByEmail(email)

  if (rows.length === 0) {
    res.send({ message: '로그인에 실패했어요. 이메일 또는 비밀번호를 확인해주세요.' })
    return
  }

  const authenticationSuceed = await compare(password, rows[0].password_hash)

  if (!authenticationSuceed) {
    res.send({ message: '로그인에 실패했어요. 이메일 또는 비밀번호를 확인해주세요.' })
    return
  }

  const jwt = generateJWT({ userId: rows[0].id })
  res.send(jwt)
})

export default router
