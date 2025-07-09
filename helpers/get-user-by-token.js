const jwt = require('jsonwebtoken')
const checkToken = require('./verify-token');
const User = require('../models/User')

const getUserByToken = async (token) =>{


    if(!token){
        return null
    }

    try {
        const decoded = jwt.verify(token, 'nossosecret')
        const userId = decoded.id
        const user = await User.findOne({where:{id: userId}})
  
        return user;
    } catch (error) {
        console.log(`erro ao verificar token ${error.message}`)
    }
}

module.exports = getUserByToken 