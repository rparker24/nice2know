"use strict";
module.exports = function (sequelize, DataTypes) {
    var Fact = sequelizeConnection.define("Fact", {
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
        category_id: {
            type: DataTypes.INTEGER,
        },
    },
    {
        underscored: true,
        freezeTableName: true,
        tableName: 'facts',
        timestamps: false,
        
        classMethods: {
            associate: function(models) {
              Fact.belongsTo(models.Category, {
                // onDelete: "CASCADE",
                foreignKey: {
                  allowNull: false
                }
              });
            }
        }
    });
    return Fact;
};

