const {DataTypes} = require('sequelize')

const db = require('../db/conn')
const Book = db.define('Book', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    genres:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    pages: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    available: {
        type : DataTypes.BOOLEAN,
        allowNull: false,
    },
    image:{
        type: DataTypes.STRING,
        allowNull: true,
    }
})


module.exports = Book;
