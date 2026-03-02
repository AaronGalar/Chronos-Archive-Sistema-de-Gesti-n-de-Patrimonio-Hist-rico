const { Teacher, Student, User } = require('../models');

module.exports = {
 getAll() {
    return Teacher.findAll();
  },

  getById(id) {
    return Teacher.findByPk(id);
  },

  getByUserId(userId) {
    return Teacher.findOne({ where: { user_id: userId } });
  },

  insert(data) {
    return Teacher.create(data);
  },

  update(id, data) {
    return Teacher.update(data, { where: { id } });
  },

  delete(id) {
    return Student.findOne({ where: { teacher_id: id } }).then(student => {
      if (student) throw new Error("No se puede borrar un profesor que tenga alumnos asociados");
      return Teacher.destroy({ where: { id } });
    });
  },

  
  getStudentsByTeacher(teacherId) {
    return Teacher.findByPk(teacherId, {
      include: [{ model: User, as: 'User' }] 
    }).then(teacher => {
      if (!teacher) throw new Error("404"); 
      if (!teacher.User || !teacher.User.active) throw new Error("401");
      
      
      return Student.findAll({
        where: { teacher_id: teacherId },
        order: [['date_of_birth', 'ASC']] 
      });
    });
  }
};