export default (sequelize, DataTypes) => {
    const Tag = sequelize.define('Tag', {
        tag_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
    }, {
        timestamps: false,
        tableName: 'tags',
    });
    return Tag;
}