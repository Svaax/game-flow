export default (sequelize, DataTypes) => {
    const Cart = sequelize.define('Cart', {
        cart_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            references: {
                model: 'users',
                key: 'user_id',
            },
        },
    }, {
        timestamps: false,
        tableName: 'carts',
    });

    return Cart;
}
