const koa  = require('koa2')
const Router = require('koa-router')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'

const app = next({ dev })

const handle  = app.getRequestHandler()

app.prepare().then(() => {
  const server = new koa()
  const router = new Router()
  server.use(router.routes())
  server.use(async (ctx, next) => {
    ctx.body = '<span>koa render</span>'
    await next()
  })
  server.use(async (ctx, next)=> {
    await handle(ctx.req, ctx.res)
    ctx.respond = false
  })
  server.listen(3000, ()=> {
    console.log('koa server listening on 3000')
  })
})