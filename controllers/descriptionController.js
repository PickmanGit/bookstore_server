const {DescriptionBook} = require('../models/models')
const ApiError = require('../error/ApiError')
class DescriptionController {
    async create(req,res,next){
        const {description,bookId} = req.body 
        if(!bookId || !description){
            return next(ApiError.badRequest('No required parameters ' + title))
        }
        const descriptions = await DescriptionBook.create({description,bookId})
        return res.json(descriptions)
    }
    async getOne(req,res){
        const {id} = req.params
        if(!id){
            return next(ApiError.badRequest('No required parameters ' + title))
        }
        const categories = await DescriptionBook.findOne({where:{id}})
        return res.json(categories)
    }
    // async getAll(req,res){
    //     const categories = await Сategories.findAll()
    //     return res.json(categories)
    // }
    // async delete(req,res){

    // }
}

module.exports = new DescriptionController()