import bcrypt from 'bcryptjs'
import { Router } from 'express'
import { registerUser } from '../database/mariadb.js'
import { generateJWT } from '../utils/jwt.js'

const { genSalt, hash } = bcrypt
const router = Router()

router.post('/', async (req, res) => {
  const { email, password, name, phoneNumber, birth, address } = req.body

  console.log(req.body)

  const passwordHash = await hash(password, await genSalt())

  const rows = await registerUser(email, passwordHash, name)

  const jwt = await generateJWT({ userId: rows[0].id })

  res.send({ jwt })
})

export default router
