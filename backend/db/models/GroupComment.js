// models/GroupComment.js
export default (sequelize, DataTypes) => {
    const GroupComment = sequelize.define('GroupComment', {
        comment_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'group_posts',
                key: 'post_id',
            },
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'user_id',
            },
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
    }, {
        timestamps: false,
        tableName: 'group_comments',
    });

    GroupComment.associate = (models) => {
        GroupComment.belongsTo(models.Guide, { foreignKey: 'guide_id' });
        GroupComment.belongsTo(models.User, { foreignKey: 'user_id' });
    };

    return GroupComment;
};