export default (sequelize, DataTypes) => {
    const GuideComment = sequelize.define('GuideComment', {
        comment_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        guide_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'guides',
                key: 'guide_id',
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
        tableName: 'guide_comments',
    });

    GuideComment.associate = (models) => {
        GuideComment.belongsTo(models.Guide, { foreignKey: 'guide_id' });

        GuideComment.belongsTo(models.User, { foreignKey: 'user_id' });
    };

    return GuideComment;
};