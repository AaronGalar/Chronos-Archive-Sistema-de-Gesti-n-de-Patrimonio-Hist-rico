const { User, Teacher } = require("../models");
const bcrypt = require("bcrypt"); 

module.exports = {
  getAll() {
    return User.findAll();
  },
  getById(id) {
    return User.findByPk(id);
  },
  getByEmail(email) {
    return User.findOne({ where: { email } });
  },
  insert(data) {
    return User.create(data);
  },
  update(id, data) {
    return User.update(data, { where: { id } });
  },
  delete(id) {
    return Teacher.findOne({ where: { user_id: id } }).then((teacher) => {
      if (teacher) {
        throw new Error(
          "No se puede borrar un usuario que tenga un profesor asociado",
        );
      }
      return User.destroy({ where: { id } });
    });
  },
  getActiveStatus(id) {
    return User.findByPk(id, {
      attributes: ["active"],
    });
  },

  activate(id) {
    return User.update({ active: true }, { where: { id } }).then(() =>
      User.findByPk(id),
    );
  },
  async insert(data) {
    const saltRounds = 10;
    data.password = await bcrypt.hash(data.password, saltRounds);
    return User.create(data);
  },
};
