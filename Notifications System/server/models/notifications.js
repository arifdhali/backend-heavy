'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notifications extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "notifications"
      })
    }
  }
  Notifications.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id"
      }
    },
    message: {
      type: DataTypes.STRING(200),
      defaultValue: null,
    },
    is_read: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Notifications',
    timestamps: true,
    tableName: "notifications"
  });
  return Notifications;
};