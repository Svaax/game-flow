export default (sequelize, DataTypes) => {
    const ForumComment = sequelize.define('ForumComment', {
        comment_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'forum_posts',
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
        tableName: 'forum_comments',
    });

    ForumComment.associate = (models) => {
        ForumComment.belongsTo(models.Guide, { foreignKey: 'guide_id' });

        ForumComment.belongsTo(models.User, { foreignKey: 'user_id' });
    };

    return ForumComment;
};