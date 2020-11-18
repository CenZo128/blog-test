const Router = require('koa-router')
const router = Router()

const {uploader} = require('../middlewares/multer')

let userController = require('../controllers/user')


router.get('/', async (ctx,next) => {
    ctx.body = 'ini dalam user bravo'
    ctx.status = 200;
})
router.get('/list', userController.list);
router.post('/register', userController.Register)
router.post('/login', userController.Login)
router.put ('/edit/:id',uploader.single('profile_image'), userController.Edit)
router.delete('/delete/:id', userController.Delete)

module.exports = router