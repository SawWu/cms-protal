const Koa = require('koa');
const app = new Koa();

app.use(ctx => {
  ctx.body = '<h1>Hello Koa</h1>';
});

app.listen(3000,()=>{
  console.log(`server run http://127.0.0.1:3000`)
});
