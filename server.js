const koa = require('koa2')
const Router = require('koa-router')
const next = require('next')
const Redis = require('ioredis')
const dev = process.env.NODE_ENV !== 'production'
const session = require('koa-session')
const app = next({ dev })

const auth = require('./server/auth')
const handle = app.getRequestHandler()

const RedisSessionStore = require('./server/session-store')

//创建redis   client
const redis = new Redis();
app.prepare().then(() => {
  const server = new koa()
  const router = new Router()


  server.keys = ['zhz develop']
  const SESSION_CONFIG = {
    key: 'jid',
    maxAge: 60 * 10000,
    store: new RedisSessionStore(redis)
  }

  server.use(session(SESSION_CONFIG, server))
  server.use(router.routes())

  // 配置处理 github oauth的登录
  auth(server)

  server.use(async (ctx, next) => {
    console.log('session is:', ctx.session)
    await next();
  })
  router.get('/a/:id', async (ctx) => {
    const id = ctx.params.id
    await handle(ctx.req, ctx.res, {
      pathname: '/a',
      query: { id }
    })
  })

  router.get('/api/user/info', async ctx => {
    const user = ctx.session.userInfo
    console.log(ctx.session.userInfo)
    if (user === undefined) {
      ctx.status = 401
      ctx.body = 'Need Login'
    } else  { //status
      ctx.body = user
      ctx.set('Content-type', 'application/json')
    }

  })
  router.get('/delete/user', async (ctx) => {
    ctx.session.user = null;
    ctx.body = 'set session success';
  });
  router.get('/set/user', async (ctx) => {
    // ctx.respond = false
    ctx.session.user = {
      name: 'zhz',
      age: 20
    }
    ctx.body = 'set session success'
  })


  // server.use(async (ctx, next) => {
  //   if (!ctx.session.user) {
  //     ctx.session.user = {
  //       name: 'zhz',
  //       age: 20
  //     }
  //   } else {
  //     console.log('session is:', ctx.session)
  //   }
  // })
  server.use(async (ctx, next) => {
    ctx.req.session = ctx.session
    await handle(ctx.req, ctx.res)
    ctx.respond = false
  })
  server.listen(3000, () => {
    console.log('koa server listening on 3000')
  })
})