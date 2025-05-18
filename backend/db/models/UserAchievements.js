// models/UserAchievement.js
export default (sequelize, DataTypes) => {
    const UserAchievement = sequelize.define('UserAchievement', {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'users',
                key: 'user_id',
            },
        },
        achievement_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'game_achievements',
                key: 'achievement_id',
            },
        },
        unlocked_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    }, {
        timestamps: false,
        tableName: 'user_achievements',
    });

    return UserAchievement;
};