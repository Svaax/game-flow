export default (sequelize, DataTypes) => {
    const Publisher = sequelize.define('Publisher', {
        publisher_id: {
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
        company_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
        },
        website: {
            type: DataTypes.STRING(255),
        },
        verified: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    }, {
        timestamps: false,
        tableName: 'publishers',
    });
    return Publisher;
}