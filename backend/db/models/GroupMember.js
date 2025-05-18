// models/GroupMember.js
export default (sequelize, DataTypes) => {
    const GroupMember = sequelize.define('GroupMember', {
        group_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'groups',
                key: 'group_id',
            },
        },
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'users',
                key: 'user_id',
            },
        },
        joined_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        role: {
            type: DataTypes.ENUM('member', 'moderator', 'admin'),
            allowNull: false,
            defaultValue: 'member',
        },
    }, {
        timestamps: false,
        tableName: 'group_members',
    });

    return GroupMember;
};