const  jwt =  require('jsonwebtoken')
const User = require("../model/User")

const getUserById = require('./get-user-by-token')
const checkToken = require('./verify-token')
//validations token

const requireRole = (role) =>{
    return async function(req, res, next){
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(" ")[1]


        if(!token){
            return res.status(401).json({message: "acesso negado!"})
        }

        try{
            const verified = jwt.verify(token, 'nossosecret')
            const user = await getUserById(verified.id);

            //verify if users Exists
            if(!user){
                return res.status(401).json({message: "usuário não encontrado!"})
            }
            //verify Role
            if(user.role != role){
                return res.status(401).json({message: "Acesso negado! Entre em contato com o Admin"})
            }
            req.user= user;
            next()


        }catch(error){
            return req.status(401).json({message: "Token inválido"})
        }
    }
}

module.exports = { requireRole}