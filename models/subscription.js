module.exports = function (sequelize, DataTypes) {
    var Subscription = sequelize.define("Subscription", {
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
        timestamps: false, 

        classMethods: {
            associate: function(models) {
              Subscription.hasMany(models.User, {
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