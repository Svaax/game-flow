export default (sequelize, DataTypes) => {
    const GameTag = sequelize.define('GameTag', {
        game_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'games',
                key: 'game_id',
            },
        },
        tag_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'tags',
                key: 'tag_id',
            },
        },
    }, {
        timestamps: false,
        tableName: 'game_tags',
    });
    return GameTag;
}