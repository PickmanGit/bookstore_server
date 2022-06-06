const { Op } = require('sequelize')
const ApiError = require('../error/ApiError')
const {Basket,BasketBook,Book} = require('../models/models')
class BasketController {

    async add(req,res,next){
        try{
            const {id} = req.user
            const {bookId} = req.body
            if(!bookId){
                return next(ApiError.badRequest('book id not received or not in the correct format'))
            }
            const basket = await Basket.findOne({where:{userId:id},attributes:["id"]})
            const basketBook = await BasketBook.create({basketId:basket.id,bookId:bookId})
            return res.json(basketBook)
        }catch(error){
            next(ApiError.badRequest(error.message))
        }
    }


    async getAll(req,res,next){
        try{
            const {id} = req.user
            const basket = await Basket.findOne({where:{userId:id},attributes:["id"]})
            const basketBook = await BasketBook.findAll({where:{basketId:basket.id},attributes:["bookId"]})
            const booksId = []
            basketBook.forEach(book=>{
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
            const basket = await Basket.findOne({where:{userId:id},attributes:["id"]})
            const basketBook = await BasketBook.destroy({where:{ [Op.and]:{basketId:basket.id,bookId}}})
            return res.json(basketBook)
        }catch(e){
            next(ApiError.badRequest(error.message))
        }
    }


}

module.exports = new BasketController()