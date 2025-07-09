const Book = require('./Book');
const User = require('./User');
const Reservation = require('./Reservations');

// RELACIONAMENTOS
User.hasMany(Reservation, { foreignKey: 'userId' });
Reservation.belongsTo(User, { foreignKey: 'userId' });

Book.hasOne(Reservation, { foreignKey: 'bookId' });
Reservation.belongsTo(Book, { foreignKey: 'bookId', unique: true });

// Exporta os modelos prontos para uso
module.exports = {
  User,
  Book,
  Reservation
};