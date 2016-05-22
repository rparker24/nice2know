"use strict";
// var models = require('../models');

module.exports = function (sequelize, DataTypes) {
    var Category = sequelize.define("Category", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        category_name: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING,
        },
        // subscriptions: {
        //     type: DataTypes.BOOLEAN,
        //     defautValue: false,
        // },
    },
    {
        underscored: true,
        freezeTableName: true,
        tableName: 'categories',
        timestamps: false, 

        classMethods: {
            associate: function(models) {
              Category.belongsTo(models.User, {
                // onDelete: "CASCADE",
                foreignKey: {
                    allowNull: false
                },
              });
              Category.hasMany(models.Fact, {
                foreignKey: {
                    allowNull: false
                },
              });
            }
        }
    });
    return Category;
};
