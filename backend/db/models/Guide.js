export default (sequelize, DataTypes) => {
    const Guide = sequelize.define('Guide', {
        guide_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'user_id',
            },
        },
        game_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'games',
                key: 'game_id',
            },
        },
        title: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        views: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
    }, {
        timestamps: false,
        tableName: 'guides',
    });

    Guide.associate = (models) => {
        Guide.belongsTo(models.User, { foreignKey: 'user_id' });
        Guide.belongsTo(models.Game, { foreignKey: 'game_id' });
        Guide.hasMany(models.GuideComment, { foreignKey: 'guide_id' });
    };

    return Guide;
};