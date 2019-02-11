const crypto = require('crypto')
const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa();
const router =  new Router();
function generateUsers(username,password){
  const salt = crypto.randomBytes(128).toString('base64')
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
  return {
    [username]: {
      salt,hash
    }
  }
}
const users = generateUsers('admin','123456')
router.get('/auth', async function (ctx,next){
  const username = ctx.query.username || 'test'
  const password = ctx.query.password || 'test'

  if (!users[username]) {
    ctx.throw(400)
  }
  const hash = crypto.pbkdf2Sync(password, users[username].salt, 10000, 64, 'sha512').toString('hex')

  if (users[username].hash === hash) {
    ctx.body = 'ok'
  } else {
    ctx.throw(403)
  }
})
app.use(router.routes()).use(router.allowedMethods());
app.listen(3000, () => {
  console.log('listen at 3000')
})