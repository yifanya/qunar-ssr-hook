const express = require('express');
const fs = require('fs');
const path = require('path');
const favicon = require('static-favicon');
// 业务代码
const session = require('express-session');
const bodyParser = require('body-parser');
const queryString = require('query-string');
const Redis = require('ioredis');
const RedisStore = require('connect-redis')(session);
const oAuth = require('./middlewares/oAuth');

const isDev = process.env.NODE_ENV === 'development';
const app = express();
const redis = new Redis();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  cookie: { path: '/', httpOnly: true, secure: false, maxAge: 10 * 60 * 1000 },
  name: 'session-id',
  resave: true,
  secret: 'asdasdhalisdaiusda',
  saveUninitialized: false,
  store: new RedisStore({
    client: new Redis()
  })
}))

app.use(favicon(path.join(__dirname, '../public/favicon.ico')));
app.use('/api', require('./routers/apiRouter'));
app.get('/getSession', (req, res) => {
  console.log(req.session);
  console.log(req.sessionID);
})

app.get('/login/session', (req, res) => {
  req.session.store = {
    name: 'yifan',
    age: 18
  }
  res.end('set session success');
})

if (!isDev) {
  console.log('production')
  require('./pro-serve')(app)
}
else {
  console.log('development')
  require('./dev-serve')(app)
}

app.use((err, req, res, next) => {
  res.status(500).send(err)
})

app.listen(3001, () => {
  console.log('server start')
});
