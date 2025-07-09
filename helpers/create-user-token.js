const jwt = require('jsonwebtoken')
const User = require('../models/User')

const createUserToken = async(user, req,res) =>{
    //create token amd valid id
    const token = jwt.sign({
        name: user.name,
        id: user.id
    }, 'nossosecret')

    //return token 
    res.status(200).json({
        message: 'Você está autenticado',
        token: token,
        userId: user.id,
    })
}


module.exports = createUserToken