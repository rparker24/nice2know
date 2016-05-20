module.exports = function (sequelize, DataTypes) {
    var Subscription = sequelizeConnection.define("Subscription", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.INTEGER,
        },
        category_id: {
            type: DataTypes.INTEGER,
        },
    },
    {
        underscored: true,
        freezeTableName: true,
        tableName: 'subscriptions', 

        classMethods: {
            associate: function(models) {
              Category.belongsTo(models.Category, {
                // onDelete: "CASCADE",
                foreignKey: {
                  allowNull: false
                }
              });
            }
        } 
    });
    return Subscription;
};