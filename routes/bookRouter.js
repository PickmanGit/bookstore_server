const Router = require('express')
const router = new Router()
const BookController = require('../controllers/bookController')
const checkRole = require('../middleware/checkRoleMiddleware')
router.post('/create',checkRole("ADMIN"),BookController.create)
router.post('/',BookController.getAll)
router.get('/:id',BookController.getOne)
// router.delete('/delete',BookController.delete)

module.exports = router