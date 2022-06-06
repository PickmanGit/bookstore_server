const { Op } = require('sequelize')
const ApiError = require('../error/ApiError')
const {PurchasedBooks,Purchased,Book} = require('../models/models')

class PurchasedController {

        async add(req,res,next){
            try{
                const {id} = req.user
                const {bookId} = req.body
                if(!bookId){
                    return next(ApiError.badRequest('book id not received or not in the correct format'))
                }
                const purchased = await Purchased.findOne({where:{userId:id},attributes:["id"]})
                const wishesBook = await PurchasedBooks.create({purchasedId:purchased.id,bookId:bookId})
                return res.json(wishesBook)
            }catch(error){
                next(ApiError.badRequest(error.message))
            }
        }
    
    
        async getAll(req,res,next){
            try{
                const {id} = req.user
                const purchased = await Purchased.findOne({where:{userId:id},attributes:["id"]})
                const purchasedBook = await PurchasedBooks.findAll({where:{purchasedId:purchased.id},attributes:["bookId"]})
                const booksId = []
                purchasedBook.forEach(book=>{
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
                const purchased = await Purchased.findOne({where:{userId:id},attributes:["id"]})
                const basketBook = await PurchasedBooks.destroy({where:{ [Op.and]:{purchasedId:purchased.id,bookId}}})
                return res.json(basketBook)
            }catch(e){
                next(ApiError.badRequest(error.message))
            }
        }
    

}

module.exports = new PurchasedController()