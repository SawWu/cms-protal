const router = require('koa-router')();
const url = require('url');

let login = require('./admin/login');
let user = require('./admin/user');


router.use(async (ctx, next) => {
  ctx.state.__HOST__ = `http://${ctx.request.header.host}`;
  let pathname = url.parse(ctx.request.url).pathname;
  if (ctx.session.userinfo) {
    await next();
  } else {
    if (pathname == '/admin/login' || pathname == '/admin/login/doLogin' || pathname == '/admin/login/code') {
      await next();
    } else {
      ctx.redirect('/admin/login');
    }
  }
})

router.get('/', async (ctx) => {
  ctx.render('admin/index');
})

router.use('/login', login);
router.use('/user', user);

module.exports = router.routes();
