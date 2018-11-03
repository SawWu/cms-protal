const router=require('koa-router')();

router.get('/', (ctx)=>{
  ctx.body='首页'
})

router.get('/case',(ctx)=>{
   ctx.body='案例'
})

router.get('/about',async (ctx)=>{

});

module.exports=router.routes();
