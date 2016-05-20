var Sequelize = require("sequelize");

var sequelizeConnection = require("../config/connection.js");

var Category = sequelizeConnection.define("categories", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    category_name: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    }
});

Category.sync();
console.log(Category);
module.exports = Category;
