'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Authors_subscribe, {
        foreignKey: "author_id",
        as: "authorSubscriptions"
      })
      this.hasMany(models.Authors_subscribe, {
        foreignKey: "user_id",
        as: "userSubscriptions"
      });

      this.hasMany(models.Books, {
        foreignKey: "author_id",
        as: "authorBooks"
      })

      this.hasMany(models.Notifications, {
        foreignKey: "user_id",
        as: "user_notifications"
      })


    }
  }
  User.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    user_type: {
      type: DataTypes.ENUM(["user", "author"]),
      defaultValue: "user"
    },
    password: {
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'User',
    timestamps: true,
  });
  return User;
};