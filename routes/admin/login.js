const router = require('koa-router')();

router.get('/', async (ctx) => {
  await ctx.render('views/admin/login');
});

router.post('/doLogin', async (ctx) => {

  console.log(ctx.request.body);

  let username = ctx.request.body.username;

  let password = ctx.request.body.password;

  let code = ctx.request.body.code;

  ctx.redirect('/');

})

module.exports = router.routes();
