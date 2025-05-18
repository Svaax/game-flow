export default (sequelize, DataTypes) => {
    const GameAchievements = sequelize.define('GameAchievement', {
        achievement_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        game_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'games',
                key: 'game_id',
            },
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        icon: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        is_secret: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        completion_percentage: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: 0,
                max: 100,
            },
        },
    }, {
        timestamps: false,
        tableName: 'game_achievements',
    });

    GameAchievements.associate = (models) => {
        GameAchievements.belongsTo(models.Game, { foreignKey: 'game_id' });
        GameAchievements.belongsToMany(models.User, {
            through: models.UserAchievements,
            foreignKey: 'achievement_id',
            as: 'UnlockedBy'
        });
    };

    return GameAchievements;
};