const Router = require('express')
const router = new Router()
const DescriptionController = require('../controllers/descriptionController')
const checkRole = require('../middleware/checkRoleMiddleware')
router.post('/create',checkRole("ADMIN"),DescriptionController.create)
// router.get('/',DescriptionController.getAll)
router.get('/:id',DescriptionController.getOne)
// router.delete('/delete',DescriptionController.delete)

module.exports = router