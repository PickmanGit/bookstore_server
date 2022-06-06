const Router = require('express')
const router = new Router()
const CategoriesController = require('../controllers/categoriesController')
const checkRole = require('../middleware/checkRoleMiddleware')
router.post('/create',checkRole("ADMIN"),CategoriesController.create)
router.get('/',CategoriesController.getAll)
router.get('/:id',CategoriesController.getOne)
// router.delete('/delete',CategoriesController.delete)

module.exports = router