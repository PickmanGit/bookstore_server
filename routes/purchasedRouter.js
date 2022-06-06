const Router = require('express')
const router = new Router()
const PurchasedController = require('../controllers/purchasedController')
const authMiddleware = require('../middleware/authMiddleware')
router.post('/add',authMiddleware,PurchasedController.add)
router.get('/',authMiddleware,PurchasedController.getAll)
router.delete('/delete',authMiddleware,PurchasedController.delete)

module.exports = router