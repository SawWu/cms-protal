const router = require('koa-router')();

const svgCaptcha = require('svg-captcha');

const tools = require('../../tool/tools.js');

const DB = require('../../model/db.js');

router.get('/', async (ctx) => {
  await ctx.render('views/admin/login');
});

router.post('/doLogin', async (ctx) => {

  console.log(ctx.request.body);

  let username = ctx.request.body.username;

  let password = ctx.request.body.password;

  let code = ctx.request.body.code;

  if (code.toLocaleLowerCase() === ctx.session.code.toLocaleLowerCase()) {
    let result = await DB.find('admin', {"username": username, "password": tools.md5(password)});
    console.log(result);
    if (result.length > 0) {
      ctx.session.userinfo = result[0];
      ctx.redirect('/admin');
    } else {
      await ctx.render('views/error', {
        message: '用户名或者密码错误',
        redirect: '/admin/login'
      })
    }
  } else {
    await ctx.render('views/error', {
      message: '验证码失败',
      redirect: '/admin/login'
    })
  }
})

router.get('/code', async (ctx) => {
  let captcha = svgCaptcha.create({
    size: 4,
    fontSize: 50,
    width: 120,
    height: 34,
    background: "#cc9966"
  });

  //保存生成的验证码
  ctx.session.code = captcha.text;
  //设置响应头
  ctx.response.type = 'image/svg+xml';
  ctx.body = captcha.data;
})


module.exports = router.routes();
