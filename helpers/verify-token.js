const jwt = require('jsonwebtoken')
const getToken = require('./get-token')
const User = require('../models/User')
//validate token
const  checkToken = async(req, res, next) =>{
    try{
        const authHeader = req.headers['authorization'];
        //if authorization empty
        if(!authHeader){
        
            res.status(401).json({message: "acesso negado! Token não fornecido"})
            return
        }

        const token = getToken(req)
        
        if(!token){
            res.status(401).json({message: "Token mal formatado!"})
            return
        }
        //verify if user exists
        const verified = jwt.verify(token, 'nossosecret')
        const user = await User.findByPk(verified.id)
        if(!user){
            res.status(401).json({message: "Usuário não encontrado!!"})
            return
        }
    
            req.user = user;
            next()

    }catch(error){
        console.error('erro no checkToken', error)
        return res.status(401).json({message: 'Token inválido!'})
    }
}
module.exports = checkToken