'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    const saltRounds = 10;

    
    return bcrypt.hash('admin123', saltRounds)
      .then(pwAdmin => {
        return bcrypt.hash('user123', saltRounds)
          .then(pwUser => {
          
            return queryInterface.bulkInsert('Users', [
              {
                email: 'admin@admin.com',
                password: pwAdmin,
                type: 'admin',
                active: true,
                createdAt: new Date(),
                updatedAt: new Date()
              },
              {
                email: 'profesor_activo@test.com',
                password: pwUser,
                type: 'user',
                active: true,
                createdAt: new Date(),
                updatedAt: new Date()
              },
              {
                email: 'profesor_inactivo@test.com',
                password: pwUser,
                type: 'user',
                active: false, 
                createdAt: new Date(),
                updatedAt: new Date()
              }
            ], {});
          });
      });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};