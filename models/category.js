"use strict";
var models = require('./models');

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
    },
    {
        underscored: true,
        freezeTableName: true,
        tableName: 'categories',
        timestamps: false, 

        classMethods: {
            associate: function(models) {
              Category.hasMany(models.Subscription, {
                // onDelete: "CASCADE",
                foreignKey: 'category_id'
              });
            }
        }
    });
    return Category;
};
