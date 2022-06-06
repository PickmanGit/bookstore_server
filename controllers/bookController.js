const {Book,DescriptionBook,BookСategories,Сategories} = require('../models/models')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')
const { Op , Sequelize} = require("sequelize");

function createFile(file,fileExtension){
    let fileName = uuid.v4() + `.${fileExtension}`
    file.mv(path.resolve(__dirname,'..','static',fileExtension==='jpg'?'images':'books',fileName))
    return fileName
}


async function removeRepetitions(categoryB,isCAtegory){
    let arr = []
    const categories = []
    const book = []
    if(!isCAtegory){
        for(const items of categoryB){
            arr[items.bookId] = items
        }
        arr = arr.filter(Boolean)
        arr.forEach(element => {
            categories.push(element.categoryId)
            book.push(element.bookId)
        });
    }else{
        for(const items of categoryB){
            arr.push(items)
            categories.push(items.categoryId)
            book[0] = items.bookId
        }
    }
    return {categories,book,arr}
}

class BookController {

    async create(req,res,next){
        try{
            const {title,language,author,price,description,category} = req.body
            const files = req.files

            const imgName = createFile(files.img,'jpg')
            const bookName = createFile(files.path,'pdf')
    
            const books = await Book.create({title,language,author,image:imgName,path:bookName,price})
            const descriptions = await DescriptionBook.create({description,bookId:books.id})
 
    
            let createdСategories = []
            if(category){
                let arrayCategory = category.split(',')
                for(const cat of arrayCategory){
                    createdСategories.push( await BookСategories.create({categoryId: Number(cat), bookId : books.id}) )
                }
            }

            
            return res.json({books,descriptions,createdСategories})

        }catch(error){
            next(ApiError.badRequest(error.message))
        }
    }


    async getOne(req,res,next){
        try{
            const {id} = req.params
            const books = await Book.findOne({where:{id}})
            const descriptions = await DescriptionBook.findOne({where:{bookId:id},attributes:["description"]})
            const categoryId = await BookСategories.findAll({where:{bookId:id},attributes:["bookId","categoryId"]})
            const {categories} = await removeRepetitions(categoryId,true)
            const category = await Сategories.findAll({where:{id:{[Op.or]:categories}},attributes:["id","title","description"]})

            return res.json({books,descriptions,category})
        }catch(error){
            next(ApiError.badRequest(error.message))
        }
        

       
    }
    
    async getAll(req,res,next){
        try{
            let {category,limit,page,order,text} = req.body
            // let q = req.body
            page = page || 1
            limit = limit || 9
            let offset = page * limit - limit
            let books;
            const ordersPrice = order === "Sort Descending" ? ["price","DESC"] :  ["price"] 
          
            if(!category){
                books = await Book.findAndCountAll({where:{limit,offset,order:[ordersPrice],title:{[Op.iLike]:`%${text}%`}}})
            }else{
                const categoryB = await BookСategories.findAll({where:{categoryId:{[Op.or]:category}},attributes:["bookId","categoryId"]})   
                let {categories,book,arr} = await removeRepetitions(categoryB)

                books = await Book.findAndCountAll( {where: { id:{[Op.or]:book}  , title:{[Op.iLike]:`%${text}%`}   },order:[ordersPrice] ,limit,offset } )


            }
            return res.json(books)
        }catch(e){
            next(ApiError.badRequest(error.message))
        }
    }

    // async delete(req,res){

    // }
}

module.exports = new BookController()