
const { Op } = require('sequelize')
const ApiError = require('../error/ApiError')
const {WishesBook,Wishes,Book} = require('../models/models')

class WishlistController {

        async add(req,res,next){
            try{
                const {id} = req.user
                const {bookId} = req.body
                if(!bookId){
                    return next(ApiError.badRequest('book id not received or not in the correct format'))
                }
                const wishes = await Wishes.findOne({where:{userId:id},attributes:["id"]})
                const wishesBook = await WishesBook.create({wishId:wishes.id,bookId:bookId})
                return res.json(wishesBook)
            }catch(error){
                next(ApiError.badRequest(error.message))
            }
        }
    
    
        async getAll(req,res,next){
            try{
                const {id} = req.user
                const wishes = await Wishes.findOne({where:{userId:id},attributes:["id"]})
                const wishesBook = await WishesBook.findAll({where:{wishId:wishes.id},attributes:["bookId"]})
                const booksId = []
                wishesBook.forEach(book=>{
                    booksId.push(book.bookId)
                })
                const books = await Book.findAll( {where:{id:{ [Op.or]:booksId } } } )
    
                return res.json(books)
            }catch(error){
                next(ApiError.badRequest(error.message))
            }
             
        }
        
        async delete(req,res,next){
            try{
                const {id} = req.user
                const {bookId} = req.body
                const wishes = await Wishes.findOne({where:{userId:id},attributes:["id"]})
                const basketBook = await WishesBook.destroy({where:{ [Op.and]:{wishId:wishes.id,bookId}}})
                return res.json(basketBook)
            }catch(e){
                next(ApiError.badRequest(error.message))
            }
        }
    

}

module.exports = new WishlistController()