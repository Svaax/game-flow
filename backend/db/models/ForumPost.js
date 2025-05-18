export default (sequelize, DataTypes) => {
    const ForumPost = sequelize.define('ForumPost', {
        post_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'user_id',
            },
        },
        title: {
            type: DataTypes.STRING(200),
            allowNull: false,
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
        updated_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        views: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
    }, {
        timestamps: false,
        tableName: 'forum_posts',
    });

    ForumPost.associate = (models) => {
        ForumPost.belongsTo(models.User, { foreignKey: 'user_id' });
        ForumPost.hasMany(models.ForumComment, { foreignKey: 'post_id' });
    };

    return ForumPost;
};