const { Student } = require('../models');

module.exports = {
  getAll() {
    return Student.findAll();
  },
  getById(id) {
    return Student.findByPk(id);
  },
  insert(data) {
    return Student.create(data);
  },
  update(id, data) {
    return Student.update(data, { where: { id } });
  },
  delete(id) {
    
    return Student.destroy({ where: { id } });
  }
};