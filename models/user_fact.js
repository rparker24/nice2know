var Sequelize = require("sequelize");

var sequelizeConnection = require("../config/connection.js");

var UserFact = sequelizeConnection.define("user_facts", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: Sequelize.INTEGER,
    },
    fact_id: {
        type: Sequelize.INTEGER,
    }
});

UserFact.sync();
console.log(UserFact)
module.exports = UserFact;