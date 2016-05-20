var Sequelize = require("sequelize");

var sequelizeConnection = require("../config/connection.js");

var Subscription = sequelizeConnection.define("subscriptions", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: Sequelize.INTEGER
    },
    category_id: {
        type: Sequelize.INTEGER
    }
});

Subscription.sync();
console.log(Subscription);
module.exports = Subscription;
