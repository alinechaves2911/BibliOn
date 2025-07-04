//imports & bd
const User = require('../model/User')

//middlewares
const  getUserByToken = require('../helpers/get-user-by-token')
const checkToken = require('../helpers/verify-token')
const createUserToken = require('../helpers/create-user-token')
const getToken = require('../helpers/get-token')
const requireRole = require('../helpers/verify-levels-role')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')




module.exports = class UserController {
    static async register(req,res){
        const {name, email, password, confirmpassword, role} = req.body
        //validations
        if(!name){
            res.status(422).json({message: 'O nome é Obrigatório!'})
            return
        }
        if(!email){
            res.status(422).json({message: 'O email é Obrigatório!'})
            return
        }
        if(!password){
            res.status(422).json({message: 'A senha é Obrigatória!'})
            return
        }
        if(!confirmpassword){
            res.status(422).json({message: 'A confirmação de senha é Obrigatória!'})
            return
        }
        if(!role){
            res.status(422).json({message: 'O nível de acesso é Obrigatório!'})
            return
        }
        if(password !== confirmpassword){
            res.status(422).json({message: 'A senha e confirmação de senha não confere'})
            return
        }
        console.log(role)
        //validate if user Existis
        const userExists = await User.findOne({where: {email: email} })
        if(userExists){
            res.status(422).json({message: 'Usuario já cadastrado, por favor utilizar outro email'})
            return
        }
        //validation role
       if(role === 'admin'){
            const existsAdmin = await User.findOne({ where: { role: 'admin' } });

            // If an administrator already exists, you need to validate the token
            if (existsAdmin) {
            const token = getToken(req);
            const user = await getUserByToken(token);
        
            // If you are not logged in or not an admin
            if (!user || user.role !== 'admin') {
                return res.status(403).json({ message: 'Apenas administradores podem criar outros administradores' });
            }
            }
       }
        

        try{
            const passwordHash = await bcrypt.hash(password, 10)
            const user = {
                name, 
                email,
                password: passwordHash,
                role: role || 'user',
            }
            const newUser = await User.create(user)
            
            res.status(200).json({message: 'Usuário criado', user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
              }})
        }catch(error){
            console.log(error)
            res.status(400).json({message: 'Erro ao criar usuário'})
        }

        
    }

    static async login(req,res){
        const { email, password} = req.body

        //validations
        if(!email){
            res.status(422).json({ message: 'O email é obrigatório!' })
            return
        }
        if(!password){
            res.status(422).json({ message: 'A senha é obrigatória!' })
            return
        }

        //check if user exists
        const user = await User.findOne({where: {email: email}})
        if(!user){
            res.status(422).json({message: "Não há usuário cadastrado com este email!"})
            return
        }

        const checkPassword = await bcrypt.compare(password, user.password)

        if(!checkPassword){
            res.status(422).json({message: "Senha inválida"})
            return
        }

        //create token
        await createUserToken(user, req,res)
    }

    //verify if user is logged
    static async checkUser(req,res){
        let currentUser
        console.log(req.headers.authorization)
        if(req.headers.authorization){
            //get token
            const token = getToken(req)
            //decode token 
            const decoded = jwt.verify(token, 'nossosecret')

            //find user by id after   token is decoded
            currentUser = await User.findByPk(decoded.id)
            currentUser.password = undefined
        }else{
            currentUser = null
        }

        res.status(200).send(currentUser)

    }
}