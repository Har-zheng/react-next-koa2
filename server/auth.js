const axios = require('axios')

const config = require('../config')

const { client_ID, client_secret,request_token_url } = config.github

module.exports = (server) => {
  server.use(async (ctx,next) => {

    console.log(ctx.path)

    if(ctx.path === '/auth'){
      const code = ctx.query
      if(!code){
        ctx.body = 'code not exit'
        return
      }
      const result = await axios({
        method: 'post',
        url: request_token_url,
        data: {
          client_ID,
          client_secret,
          code
        },
        headers: {
          Accept: 'application/json'
        }
      })
      console.log(result)
      if(result.status === 200){
        ctx.session.githubAuth = result.data
        ctx.redirect('/')
      }else{
        ctx.body = `request token failed ${result.message}`
      }
    }else{
      await next()
    }
  })
}