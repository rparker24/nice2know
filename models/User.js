var Sequelize = require("sequelize");

var sequelizeConnection = require("../config/connection.js");

var User = sequelizeConnection.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  password_hash: {
    type: Sequelize.STRING,
  },
  phone: {
    type: Sequelize.STRING,
  },
  countrycode: {
    type: Sequelize.STRING,
  },
  subscribed: {
    type: Sequelize.BOOLEAN,
    default: false
  },
},
{
  underscored: true
});

User.sync();
module.exports = User;