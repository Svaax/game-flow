export default (sequelize, DataTypes) => {
    const Group = sequelize.define('Group', {
        group_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        created_by: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'user_id',
            },
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        icon: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
    }, {
        timestamps: false,
        tableName: 'groups',
    });

    Group.associate = (models) => {
        Group.belongsTo(models.User, {
            foreignKey: 'created_by',
            as: 'Creator'
        });

        Group.belongsToMany(models.User, {
            through: models.GroupMember,
            foreignKey: 'group_id',
            as: 'Members'
        });

        Group.hasMany(models.GroupPost, { foreignKey: 'group_id' });
    };

    return Group;
};