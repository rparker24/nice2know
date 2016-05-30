"use strict";

var Fact = require('../models/fact.js');
var User = require('../models/user.js');

module.exports = function (sequelize, DataTypes) {
    var Category = sequelize.define("Category", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        category_name: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        }
    },
    {
        underscored: true,
        freezeTableName: true,
        tableName: 'categories',
        timestamps: false,

        classMethods: {
            associate: function(models) {
                Category.belongsToMany(models.User, {
                    through: "user_categories"
                });
            }
        }
    });
    return Category;
};
