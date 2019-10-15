const url = require('url');
const axios = require('axios');
const { clientID, clientSecret, request_token_url } = require('../../oAuth');

exports = module.exports = async function (req, res, next) {
  const { pathname, query: { code } } = url.parse(req.url, true);
  if (pathname === '/auth') {
    if (!code) res.end('code not exist');
    else {
      const result = await axios({
        method: 'POST',
        url: request_token_url,
        data: {
          client_id: clientID,
          client_secret: clientSecret,
          code
        },
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      });
      if (result.status === 200 && !result.data.error) {
        req.session.githubAuth = result.data.split('&').reduce((prev, next) => {
          const [key, value] = next.split('=');
          prev[key] = value;
          return prev;
        }, {});
        const { access_token, token_type } = req.session.githubAuth;
        const userInfo = await axios({
          method: 'GET',
          url: 'https://api.github.com/user',
          headers: {
            'Authorization': `${token_type} ${access_token}`
          }
        })
        req.session.userInfo = userInfo.data;
        res.redirect('/');
      }
      else res.send('request token error');
    }
    return
  }
  next();
}