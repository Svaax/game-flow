// models/User.js
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        bio: {
            type: DataTypes.TEXT
        },
        status: {
            type: DataTypes.STRING
        }
    });

    User.associate = models => {
        User.belongsToMany(models.Game, {
            through: 'UserGames',
            as: 'games',
            foreignKey: 'userId'
        });
        User.belongsToMany(models.User, {
            through: 'UserFriends',
            as: 'friends',
            foreignKey: 'userId',
            otherKey: 'friendId'
        });
        User.belongsToMany(models.Community, {
            through: 'UserCommunities',
            as: 'communities',
            foreignKey: 'userId'
        });
        User.hasMany(models.SupportTicket, {
            foreignKey: 'userId',
            as: 'supportTickets'
        });
    };

    return User;
};