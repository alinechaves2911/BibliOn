const  jwt =  require('jsonwebtoken')
const User = require("../models/User")

const getUserById = require('./get-user-by-token')
const checkToken = require('./verify-token')
//validations token

const requireRole = (role) =>{
   return (req, res, next) =>{
        if(!req.user){
            return res.status(401).json({ message: 'Usuário não autenticado!' });
        }
        if (req.user.role !== role) {
            return res.status(403).json({ message: 'Acesso negado! Você não tem permissão.' });
          }
      
          next();
   }
       
}

module.exports = { requireRole }