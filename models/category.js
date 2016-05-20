"use strict";
module.exports = function (sequelize, DataTypes) {
    var Category = sequelizeConnection.define("Category", {
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

        classMethods: {
            associate: function(models) {
              .belongsTo(models.User, {
                // onDelete: "CASCADE",
                foreignKey: {
                  allowNull: false
                }
              });
            }
        }
    });
    return Category;
};
