export default (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            validate: {isEmail: true},
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM('USER', 'DEVELOPER', 'PUBLISHER', 'ADMIN'),
            allowNull: false,
            defaultValue: 'USER',
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        last_login: {
            type: DataTypes.DATE,
        },
    }, {
        timestamps: false,
        tableName: 'users',
    });




    // Associations
    User.associate = (models) => {
        User.hasOne(models.Developer, { foreignKey: 'user_id' });
        User.hasOne(models.Publisher, { foreignKey: 'user_id' });
        User.hasOne(models.Cart, { foreignKey: 'user_id' });
        User.hasOne(models.Wishlist, { foreignKey: 'user_id' });
        User.hasMany(models.Review, { foreignKey: 'user_id' });
        User.hasMany(models.LibraryGame, { foreignKey: 'user_id' });
        User.hasMany(models.Guide, { foreignKey: 'user_id' });
        User.hasMany(models.ForumPost, { foreignKey: 'user_id' });
        User.belongsToMany(models.Group, {
            through: models.GroupMember,
            foreignKey: 'user_id',
            as: 'Groups'
        });

        User.hasMany(models.GroupPost, { foreignKey: 'user_id' });
        User.belongsToMany(models.GameAchievements, {
            through: models.UserAchievements,
            foreignKey: 'user_id',
            as: 'Achievements'
        });
    };

    return User;
}