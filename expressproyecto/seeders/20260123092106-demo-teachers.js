'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    
    return queryInterface.bulkInsert('Teachers', [
      {
        dni: '11111111A',
        name: 'Roberto',
        last_name: 'García',
        date_of_birth: new Date('1985-03-25'),
        user_id: 2, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        dni: '22222222B',
        name: 'Marta',
        last_name: 'Sánchez',
        date_of_birth: new Date('1990-07-12'),
        user_id: 3, 
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Teachers', null, {});
  }
};