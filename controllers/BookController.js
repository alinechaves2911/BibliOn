
const Book = require('../models/Book')
module.exports = class  BooksController {
    static async createBook(req,res){
        const {title, author,genres,pages, description}  = req.body;
        const image =  req.file?.filename
        const available = true
      
        //validations
        if(!title){
            res.status(422).json({message: "O titulo é obrigatório!"})
            return
        }
        const titleExists = await Book.findOne({ where: { title } });

        if (titleExists) {
        return res.status(422).json({ message: "O título já está cadastrado!" });
        }
       
        
        if(!author){
            res.status(422).json({message: "O autor é obrigatório!"})
            return
        }
        if(!genres){
            res.status(422).json({message: "O gênero é obrigatório!"})
            return
        }
        //validation if page is a number and is not empy or <= 0
        const pageNumber = Number(pages)
        if(isNaN(pageNumber)|| !Number.isInteger(pageNumber) || pageNumber <= 0){
            res.status(422).json({message: "O número de páginas é obrigatório, deve ser um número inteiro e positivo!"})
        }
        if(!pages){
            pages = pageNumber
            res.status(422).json({message: "O número de paginas é obrigatório!"})
            return
        }

        if(!description){
            res.status(422).json({message: "A descrição é Obrigatória!"})
            return
        }
        if(!image){
            res.status(422).json({message: "A capa é Obrigatória!"})
            return
        }

        const book = {
            title,
            author,
            genres,
            pages,
            description,
            image,
            available
        }

        try{
            const newBook = await Book.create(book)
            res.status(201).json({message: "Livro cadastrado com sucesso",newBook})
        }catch(error){
            res.status(500).json({message: error})
        }
    }
}