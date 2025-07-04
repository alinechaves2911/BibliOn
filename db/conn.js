const {Sequelize} = require('sequelize')

const sequelize = new Sequelize(
    'biblion', 'root', '', {
        host:'localhost',
        dialect: 'mysql'
});

try {
    sequelize.authenticate()
    console.log('Banco conectado!')
} catch (error) {
    console.log(`Não foi possivel conectar ao banco: ${error}`)  
}