export default (sequelize, DataTypes) => {
    const Game = sequelize.define('Game', {
        game_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        release_date: {
            type: DataTypes.DATEONLY,
        },
        cover_image: {
            type: DataTypes.STRING(255),
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    }, {
        timestamps: false,
        tableName: 'games',
    });

    Game.associate = (models) => {
        Game.belongsTo(models.Developer, { foreignKey: 'developer_id' });
        Game.belongsTo(models.Publisher, { foreignKey: 'publisher_id' });
        Game.hasMany(models.Review, { foreignKey: 'game_id' });
        Game.belongsToMany(models.Tag, {
            through: models.GameTag,
            foreignKey: 'game_id',
            as: 'Tags'
        });
        Game.hasMany(models.GameAchievements, { foreignKey: 'game_id' });
        Game.belongsToMany(models.User, {
            through: models.LibraryGame,
            foreignKey: 'game_id',
            as: 'Owners'
        });
        Game.hasMany(models.Guide, { foreignKey: 'game_id' });
    };

    return Game;
}