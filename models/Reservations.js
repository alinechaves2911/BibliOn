const {DataTypes} = require('sequelize')

const db = require('../db/conn')


const Reservation = db.define('Reservations',{
    status:{
        type: DataTypes.STRING,
        allowNull: false
    },
    reservationDate:{
        type: DataTypes.DATE, 
        allowNull: false
        
    },

    returnedDate: {
        type: DataTypes.DATE, 
        allowNull: true
    }
})


module.exports = Reservation