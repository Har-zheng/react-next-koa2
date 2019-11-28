
const GITHUB_OAUTH_URL = "https://github.com/login/oauth/authorize"
const SCOPE = 'user'

const client_id = '9053c66298ab25bc5cd9'
module.exports = {
  github: {
    "request_token_url": 'https://github.com/login/oauth/access_token',
    client_id ,
    "client_secret": "f3ccfcc6677f53d841e8fa1451b4b90f52972a38"
  },
  GITHUB_OAUTH_URL,
  OAUTH_URL: `${GITHUB_OAUTH_URL}?client_id=${client_id}&scope=${SCOPE}`
}

// acctoken access_token=92f4c20f8971816e02924b4eec4bee25bf5c4d43&scope=repo%2Cuser&token_type=bearer