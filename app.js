const Koa = require('koa');
const router = require('koa-router')();
const serve = require('koa-static');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const views = require('koa-views');
const app = new Koa();

app.use(bodyParser());
app.use(serve(__dirname + '/public'));

const ip = '127.0.0.1';
const host = '3000';

app.keys = ['some secret hurr'];

const CONFIG = {
  key: 'koa:sess',
  maxAge: 86400000,
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: false,
  renew: false,
};

app.use(session(CONFIG, app));

app.use(views(__dirname, { extension: 'pug' }))

const admin=require('./routes/admin.js');
// const api=require('./routes/api.js');
const index=require('./routes/index.js');

router.use(index);
router.use('/admin',admin);
// router.use('/api',api);

app.use(router.routes()).use(router.allowedMethods());

app.listen(host, () => {
  console.log(`server run http://${ip}:${host}`)
});


