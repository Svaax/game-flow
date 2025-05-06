// models/Game.js
module.exports = (sequelize, DataTypes) => {
    const Game = sequelize.define('Game', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT
        },
        price: {
            type: DataTypes.DECIMAL(10, 2)
        },
        achievements: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        filePath: {
            type: DataTypes.STRING // Ссылка (путь к файлу)
        }
    });

    Game.associate = models => {
        Game.belongsTo(models.Developer, {
            foreignKey: 'developerId',
            as: 'developer'
        });
        Game.belongsTo(models.Publisher, {
            foreignKey: 'publisherId',
            as: 'publisher'
        });
        Game.belongsToMany(models.User, {
            through: 'UserGames',
            as: 'users',
            foreignKey: 'gameId'
        });
    };

    return Game;
};