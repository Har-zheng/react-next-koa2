const axios = require('axios')

const config = require('../config')

const {
  client_id,
  client_secret,
  request_token_url
} = config.github

module.exports = (server) => {
  server.use(async (ctx, next) => {
    console.log(ctx.path)
    if (ctx.path === '/auth') {
      const code = ctx.query.code
      if (!code) {
        ctx.body = 'code not exit'
        return
      }
      const result = await axios({
        method: 'post',
        url: request_token_url,
        data: {
          client_id,
          client_secret,
          code
        },
        headers: {
          Accept: 'application/json'
        }
      })
      console.warn(result.data, result.status)
      if (result.status === 200 && (result.data && !result.data.error)) {
        ctx.session.githubAuth = result.data
        const {
          access_token,
          token_type
        } = result.data
        const userInfoResp = await axios({
          method: 'get',
          url: 'https://api.github.com/user',
          headers: {
            Authorization: `${token_type} ${access_token}`
          }
        })
        console.log(userInfoResp.data)
        ctx.session.userInfo = userInfoResp.data
        console.log(ctx.session)
        ctx.redirect((ctx.session && ctx.session.urlBeforeOAuth) || '/')
        ctx.session.urlBeforeOAuth = ''
        // ctx.session.user = 
        // ctx.redirect('/')
      } else {
        const errorMsg = result.data && result.data.error
        ctx.body = `request token failed ${errorMsg}`
      }
    } else {
      await next()
    }
  })
  server.use(async (ctx, next) => {
    const path = ctx.path
    const method = ctx.method
    if (path === '/logout' && method === 'POST') {
      ctx.session = null
      ctx.body = `logout success`
    } else {
      await next()
    }
  })
  server.use(async (ctx, next) => {
    const path = ctx.path
    const method = ctx.method
    if (path === '/prepare-auth' && method === 'GET') {
      // ctx.session = null
      // ctx.body = `logout success`
      const {
        url
      } = ctx.query
      ctx.session.urlBeforeOAuth = url
      ctx.redirect(config.OAUTH_URL)
    } else {
      await next()
    }
  })
}