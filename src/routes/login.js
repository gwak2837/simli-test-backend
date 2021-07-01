import { getUser } from '../database/mariaDBConn.js' // "mariaDBConn.js" 파일을 불러옴.

import { Router } from 'express'
import path from 'path'
const router = Router()

// POST 방식 요청이면  /loginProcess 라우터
router.post('/', async (req, res) => {
  const id = req.body.id // POST 방식 요청이면  req.body[".."] 로
  const pw = req.body.pw // POST 방식 요청이면  req.body[".."] 로

  const rows = await getUser(id)
  console.log(rows[0], rows[0].user_pw)

  if (pw === rows[0].user_pw) {
    if (!req.session.loginuser) {
      req.session.loginuser = rows[0].user_name
    }
    res.render('main', { userid: req.session.loginuser })
  } else {
    res.send('로그인 실패. 다시 로그인 하세요.')
  }
})

export default router
