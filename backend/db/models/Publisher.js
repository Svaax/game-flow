// models/Publisher.js
module.exports = (sequelize, DataTypes) => {
    const Publisher = sequelize.define('Publisher', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT
        }
    });

    Publisher.associate = models => {
        Publisher.hasMany(models.Game, {
            foreignKey: 'publisherId',
            as: 'publishedGames'
        });
        Publisher.hasMany(models.SupportAgent, {
            foreignKey: 'publisherId',
            as: 'supportAgents'
        });
    };

    return Publisher;
};