"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Teacher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: "user_id",
      });

      // Relación 1:N
      this.hasMany(models.Student, {
        foreignKey: "teacher_id",
      });
    }
  }
  Teacher.init(
    {
      dni: DataTypes.STRING,
      name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      date_of_birth: DataTypes.DATE,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Teacher",
    },
  );
  return Teacher;
};
