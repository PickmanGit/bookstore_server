const {Сategories} = require('../models/models')
const ApiError = require('../error/ApiError')
class CategoriesController {
    
    async create(req,res,next){
        const {title,description} = req.body
        if(!title || !description){
            return next(ApiError.badRequest('No required parameters ' + title))
        }
        const categories = await Сategories.create({title,description})
        return res.json(categories)
    }

    async getAll(req,res){
        const categories = await Сategories.findAll()
        return res.json(categories)
    }

    async getOne(req,res){
        const {id} = req.params
        if(!id){
            return next(ApiError.badRequest('No required parameters ' + title))
        }
        const categories = await Сategories.findOne({where:{id}})
        return res.json(categories)
    }

    // async delete(req,res){

    // }
}

module.exports = new CategoriesController()