const multer = require('multer')

const path = require('path')


//create a destination to storage images
const imageStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        let folder =""//
        //verify folder if users or books
        if(req.baseUrl.includes("users")){
            folder = "users"
        }else if(req.baseUrl.includes("books")){
            folder = "books"
        }
        cb(null, `public/images/${folder}`)
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + String(Math.floor(Math.random() * 1000)) + path.extname(file.originalname));
    },
})
//image upload
const imageUpload = multer({
    storage: imageStorage,
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(png|jpg)$/)){
            return cb(new Error("Por favor, envie apenas jpg ou png"))
        }
        cb(undefined, true)
    }
})
module.exports = {imageUpload}