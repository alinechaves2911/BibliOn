const router = require('express').Router();
const BooksController = require('../controllers/BookController');

const {requireRole} = require('../helpers/verify-levels-role'); // deve exportar uma função!
const verifyToken = require('../helpers/verify-token');
const { imageUpload } = require('../helpers/image-upload')

router.post('/createbook',verifyToken,requireRole('admin'),imageUpload.single('image'),BooksController.createBook)

module.exports = router