"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Task.belongsTo(models.List)
      Task.belongsTo(models.Status)
    }
  }
  Task.init(
    {
      description: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "Task",
    }
  )
  return Task
}
