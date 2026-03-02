'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Students', [
      {
        dni: '33333333C',
        name: 'Laura',
        last_name: 'Pérez',
        date_of_birth: new Date('2008-01-15'), 
        teacher_id: 1, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        dni: '44444444D',
        name: 'Carlos',
        last_name: 'Ruiz',
        date_of_birth: new Date('2005-05-20'), 
        teacher_id: 1, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        dni: '55555555E',
        name: 'Elena',
        last_name: 'Gómez',
        date_of_birth: new Date('2007-11-30'),
        teacher_id: 1, 
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Students', null, {});
  }
};