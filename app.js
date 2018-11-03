const Koa = require('koa');
const router = require('koa-router')();
const app = new Koa();

const ip = '127.0.0.1'
const host = '3000';

// const admin=require('./routes/admin.js');
// const api=require('./routes/api.js');
const index=require('./routes/index.js');

router.use(index);
// router.use('/admin',admin);
// router.use('/api',api);

app.use(router.routes()).use(router.allowedMethods());

app.listen(host, () => {
  console.log(`server run http://${ip}:${host}`)
});


