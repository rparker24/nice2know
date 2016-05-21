"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
    },
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
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
          User.hasMany(models.Subscriptions, {
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


