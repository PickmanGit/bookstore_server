const Router = require('express')
const router = new Router()
const BasketController = require('../controllers/basketController')
const authMiddleware = require('../middleware/authMiddleware')
router.post('/add',authMiddleware,BasketController.add)
router.get('/',authMiddleware,BasketController.getAll)
router.delete('/delete',authMiddleware,BasketController.delete)

module.exports = router