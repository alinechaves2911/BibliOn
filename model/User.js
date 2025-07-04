const { DataTypes } = require('sequelize')


const db = require('../db/conn')


const User = db.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    resetToken: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    resetExpiresToken: {
        type: DataTypes.DATE,
        allowNull: true,
    },

    role: {
        type: DataTypes.ENUM('user', 'admin'),
        defaultValue: 'user'
    },
    image:{
        type: String,
        allowNull: true,
    }
})

User.associate = (models) =>{
    User.hasMany(models.Reservations)
}

module.exports = User