const sequelize = require('../db')
const {DataTypes} = require('sequelize')


const User = sequelize.define('user',{
    id: {type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    email: {type:DataTypes.STRING , unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"}
})

const Basket = sequelize.define('basket',{
    id: {type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true}
})

const BasketBook = sequelize.define('basket_book',{
    id: {type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true}
})

const Wishes = sequelize.define('wishes',{
    id: {type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true}
})

const WishesBook = sequelize.define('wishes_book',{
    id: {type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true}
})

const Purchased = sequelize.define('purchased',{
    id: {type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true}
})

const PurchasedBooks = sequelize.define('purchased_books',{
    id: {type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true}
})

const Rating = sequelize.define('rating',{
    id: {type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    rate: {type: DataTypes.INTEGER, allowNull:false}
})

const Book = sequelize.define('book',{
    id: {type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    title: {type:DataTypes.STRING,unique: true , allowNull:false },
    language: {type:DataTypes.STRING, allowNull:false},
    author: {type: DataTypes.STRING , allowNull:false},
    image:{type: DataTypes.STRING , allowNull:false},
    path:{type: DataTypes.STRING , allowNull:false},
    price:{type:DataTypes.INTEGER , defaultValue: 0},
    rating: {type: DataTypes.INTEGER, defaultValue:0}
})


const BookСategories = sequelize.define('book_categories',{
    id: {type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true}
})
const Сategories = sequelize.define('categories',{
    id: {type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    title: {type:DataTypes.STRING,unique: true , allowNull:false },
    description: {type: DataTypes.STRING , allowNull:false},
})

const DescriptionBook = sequelize.define('description_book',{
    id: {type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    // book_id: {type:DataTypes.INTEGER},
    description: {type:DataTypes.TEXT,unique: true , allowNull:false }
})

// const Author = sequelize.define('author',{
//     id: {type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
//     name: {type:DataTypes.STRING},
// })

// const Language = sequelize.define('language',{
//     id: {type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
//     title: {type:DataTypes.STRING},
// })

User.hasOne(Basket)
Basket.belongsTo(User)

User.hasOne(Wishes)
Wishes.belongsTo(User)

User.hasOne(Purchased)
Purchased.belongsTo(User)

Purchased.hasMany(PurchasedBooks)
PurchasedBooks.belongsTo(Purchased)

Book.hasMany(PurchasedBooks)
PurchasedBooks.belongsTo(Book)

User.hasMany(Rating)
Rating.belongsTo(User)

Book.hasMany(Rating)
Rating.belongsTo(Book)


Basket.hasMany(BasketBook)
BasketBook.belongsTo(Basket)

Book.hasMany(BasketBook)
BasketBook.belongsTo(Book)



Wishes.hasMany(WishesBook)
WishesBook.belongsTo(Wishes)

Book.hasHook(WishesBook)
WishesBook.belongsTo(Book)


DescriptionBook.hasOne(Book)
Book.belongsTo(DescriptionBook)

Book.hasOne(DescriptionBook)
DescriptionBook.belongsTo(Book)

Book.hasMany(BookСategories)
BookСategories.belongsTo(Book)

Сategories.hasMany(BookСategories)
BookСategories.belongsTo(Сategories)



module.exports = {
    User,
    Basket,
    BasketBook,
    Wishes,
    WishesBook,
    Rating,
    Book,
    BookСategories,
    Сategories,
    DescriptionBook,
    Purchased,
    PurchasedBooks
}