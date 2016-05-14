var Sequelize = require("sequelize");

var sequelizeConnection = require("../config/connection.js");



var Fact = sequelizeConnection.define("fact", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    fact: {
        type: Sequelize.STRING,
    },
    topic: {
        type: Sequelize.BOOLEAN,
    }
});

// mysql

Fact.sync();
console.log(Fact)
module.exports = Fact;