SELECT id
FROM user
WHERE email = ?
  AND password_hash = ?
  AND name = ?;