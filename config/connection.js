
// Dependencies
var Sequelize = require("sequelize");

// Lists out connection options
var source = {
    localhost: {
        host: 'localhost',
        user: 'root',
        password: "",
        database: "burgers_db"
    },
    jawsDB: {
      host: 'izm96dhhnwr2ieg0.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
      user: 'nme2hukexdvjdl1g',
      password: 'hrjudija9vwmea0c',
      database: '3306'
    }
}

// connection 
var selectedSource = source.jawsDB;

// Creates mySQL connection using Sequelize
var sequelize = new Sequelize(selectedSource.database, selectedSource.user, selectedSource.password, {
   define: { timestamps: false },
  host: selectedSource.host,
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },

});

// Exports the connection for other files to use
module.exports = sequelize;