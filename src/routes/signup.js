import { signupUser } from '../database/mariaDBConn.js' // "mariaDBConn.js" 파일을 불러옴.

import { Router } from 'express'
import path from 'path'
const router = Router()

// POST 방식 요청이면  /loginProcess 라우터
router.post('/', async (req, res) => {
  const id = req.body.id // POST 방식 요청이면  req.body[".."] 로
  const pw = req.body.pw // POST 방식 요청이면  req.body[".."] 로
  const name = req.body.name //

  await signupUser(id, pw, name)

  if (!req.session.loginuser) {
    req.session.loginuser = name
  }

  res.render('signup-main', { username: req.session.loginuser })
  req.session.destroy()
})

export default router
