const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User,Basket, Wishes,Purchased} = require('../models/models')

function generateJwt(id,email,role){
    return jwt.sign(
        {id:id,email:email,role:role},
        process.env.SECRET_KEY,
        {expiresIn:"24h"})
}

class UserController {


    async registration(req,res,next){
        try{
            const {email,password,role} = req.body
            if(!email || !password){
               return next(ApiError.badRequest("incorrect email or password"))
            }
            const candidate = await User.findOne({where:{email}})
            if(candidate){
                return next(ApiError.badRequest("User with this e-mail is already registered"))
             }
             const  hashPassword = await bcrypt.hash(password, 5)
             const user = await User.create({email,role,password:hashPassword})
             const basket = await Basket.create({userId:user.id})
             const wishes = await Wishes.create({userId:user.id})
             const purchased = await Purchased.create({userId:user.id})
             const token = generateJwt(user.id,user.email,user.role)
            
            return res.json({token})
        }catch(error){
            next(ApiError.badRequest(error.message))
        }
    }

    async login(req,res,next){
        try{
            const {email,password} = req.body
            if(!email || !password){
               return next(ApiError.badRequest("incorrect email or password"))
            }
            const user = await User.findOne({where:{email}})
            if(!user){
                return next(ApiError.badRequest("User with this email does not exist"))
             }
            const comparePassword = bcrypt.compareSync(password,user.password)
            if(!comparePassword){
                return next(ApiError.badRequest("Passwords do not match"))
            }
            const token = generateJwt(user.id,user.email,user.role)

            return res.json({token})
        }catch(error){
            next(ApiError.badRequest(error.message))
        }
    }
    async check(req,res,next){
        const token = generateJwt(req.user.id,req.user.email,req.user.role)
        return res.json({token})
    }
//     async delete(req,res){

//     }
 }

module.exports = new UserController()