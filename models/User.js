"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password_hash: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
    countrycode: {
      type: DataTypes.INTEGER,
    },
  },
  {
    underscored: true,
    timestamps: false,
    freezeTableName: true,
    tableName: 'users',

    classMethods: {
        associate: function(models) {
          User.hasMany(models.Category, {
            // onDelete: "CASCADE",
            foreignKey: {
              allowNull: false
            }
          });
        }
    }
  });
  return User;
};


