"use strict";

var Category = require('../models/category.js');
var User = require('../models/User.js');

module.exports = function (sequelize, DataTypes) {
    var Fact = sequelize.define("Fact", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        fact: {
            type: DataTypes.STRING,
        },
        topic: {
            type: DataTypes.STRING,
        },
        // category_id: {
        //     type: DataTypes.INTEGER,
        // },
    },
    {
        underscored: true,
        freezeTableName: true,
        tableName: 'facts',
        timestamps: false,
        
        classMethods: {
            associate: function(models) {
                Fact.belongsToMany(models.User, {
                   through: 'user_facts' 
                });
            }
        }
    });
    return Fact;
};


