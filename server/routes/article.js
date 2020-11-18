const Router = require('koa-router')
const router = Router()

router.get('/', async (ctx,next) => {
    ctx.body = 'ini dalam article'
    ctx.status = 200;
})

module.exports = router