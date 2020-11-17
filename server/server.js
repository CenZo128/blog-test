const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const router = Router()
const PORT = 3000

// app.use(ctx => {
//     ctx.body = 'Hello Koa'
// })
router.get('/', (ctx,next) => {
    ctx.body = 'Sudah jalan dengan dia ea'
})

app
    .use(router.routes())
    .use(router.allowedMethods())

app.listen(PORT, ()=>{
    console.log("App is running at : ", PORT)
})
