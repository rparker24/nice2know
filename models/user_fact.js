module.exports = function (sequelize, DataTypes) {
    var UserFact = sequelizeConnection.define("UserFact", {
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
        tableName: 'user_facts' 
    });
    return UserFact;
};
