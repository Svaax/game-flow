// models/Developer.js
module.exports = (sequelize, DataTypes) => {
    const Developer = sequelize.define('Developer', {
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

    Developer.associate = models => {
        Developer.hasMany(models.Game, {
            foreignKey: 'developerId',
            as: 'developedGames'
        });
        Developer.hasMany(models.SupportAgent, {
            foreignKey: 'developerId',
            as: 'supportAgents'
        });
    };

    return Developer;
};