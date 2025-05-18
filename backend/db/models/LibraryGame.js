// models/LibraryGame.js
export default (sequelize, DataTypes) => {
    const LibraryGame = sequelize.define('LibraryGame', {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'users',
                key: 'user_id',
            },
        },
        game_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'games',
                key: 'game_id',
            },
        },
        hours_played: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0,
        },
        last_played: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        purchased_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    }, {
        timestamps: false,
        tableName: 'library_games',
    });

    LibraryGame.associate = (models) => {
        LibraryGame.belongsTo(models.User, { foreignKey: 'user_id' });
        LibraryGame.belongsTo(models.Game, { foreignKey: 'game_id' });
    };

    return LibraryGame;
};