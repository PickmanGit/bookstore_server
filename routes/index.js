const Router = require('express')
const router = new Router()

const bookRouter = require('./bookRouter')
const categoriesRouter = require('./categoriesRouter')
const descriptionRouter = require('./descriptionBookRouter')
const userRouter = require('./userRouter')
const wishlistRouter = require('./wishlistRouter')
const basketRouter = require('./basketRouter')
const purchasedRouter = require('./purchasedRouter')

router.use('/book',bookRouter)
router.use('/categories',categoriesRouter)
router.use('/description',descriptionRouter)
router.use('/user',userRouter)
router.use('/wishlist',wishlistRouter)
router.use('/basket',basketRouter)
router.use('/purchased',purchasedRouter)
module.exports = router