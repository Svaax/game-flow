export default (sequelize, DataTypes) => {
    const CartGame = sequelize.define('CartGame', {
        cart_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'carts',
                key: 'cart_id',
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
        tableName: 'cart_games',
    });
    return CartGame;
}