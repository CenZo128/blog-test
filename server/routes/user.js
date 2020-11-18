const Router = require('koa-router')
const router = Router()

router.get('/', async (ctx,next) => {
    ctx.body = 'ini dalam user bravo'
    ctx.status = 200;
})
router.get()

module.exports = router