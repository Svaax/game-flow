export default (sequelize, DataTypes) => {
    const WishlistGame = sequelize.define('WishlistGame', {
        wishlist_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'wishlists',
                key: 'wishlist_id',
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
        added_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    }, {
        timestamps: false,
        tableName: 'wishlist_games',
    });
    return WishlistGame;
}