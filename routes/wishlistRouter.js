const Router = require('express')
const router = new Router()
const WishlistController = require('../controllers/wishlistController')
const authMiddleware = require('../middleware/authMiddleware')
router.post('/add',authMiddleware,WishlistController.add)
router.get('/',authMiddleware,WishlistController.getAll)
router.delete('/delete',authMiddleware,WishlistController.delete)

module.exports = router