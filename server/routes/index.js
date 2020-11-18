const Router = require('koa-router')
const router = Router()
const userRoutes = require('./user')

const articleRoutes = require('./article')

router.get('/', async (ctx,next) => {
    ctx.body = 'ini adalah home bravo'
    ctx.status = 200;
})

router.use('/users', userRoutes.routes())
router.use('/articls', userRoutes.routes())

module.exports = router