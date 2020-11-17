const Router = require('koa-router')
const router = Router()

// app.use(ctx => {
//     ctx.body = 'Hello Koa'
// })
router.get('/', (ctx,next) => {
    ctx.body = 'Sudah jalan dengan dia ea'
})

router.get('/users', (ctx,next) => {
    ctx.body = 'Ini dalam users'
})

module.exports = router