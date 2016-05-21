module.exports = function (sequelize, DataTypes) {
    var UserFact = sequelize.define("UserFact", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.INTEGER,
        },
        fact_id: {
            type: DataTypes.INTEGER,
        },
    },
    {
        underscored: true,
        freezeTableName: true,
        tableName: 'user_facts',
        timestamps: false,

        classMethods: {
            associate: function(models) {
              UserFact.belongsTo(models.User, {
                // onDelete: "CASCADE",
                foreignKey: {
                  allowNull: false
                }
              });
              //more relations....
              // UserFact.belongsTo(models.User, {
              //   // onDelete: "CASCADE",
              //   foreignKey: {
              //     allowNull: false
              //   }
              // });
            }
        } 
    });
    return UserFact;
};
