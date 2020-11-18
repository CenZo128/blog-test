const Router = require('koa-router')
const router = Router()
// let studentController = require('../controllers/user')

router.get('/', async (ctx,next) => {
    ctx.body = 'ini dalam user bravo'
    ctx.status = 200;
})
// router.get('/list', studentController.listAll);
// router.post('/register', studentController.Register)

module.exports = router