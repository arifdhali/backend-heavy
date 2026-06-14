module.exports = (sequelize, DataTypes) => {

    const Users = sequelize.define('Users', {
        id: {
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
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
            set(value) {
                this.setDataValue(
                    'email',
                    value.toLowerCase()
                );
            }
        },

        password: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },

        fullName: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },

        profilePicture: {
            type: DataTypes.STRING(500),
            allowNull: true,
        },

        bio: {
            type: DataTypes.STRING(500),
            allowNull: true,
        },

        followersCount: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
        },

        followingCount: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
        },

        isVerified: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },

        isPrivate: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },

        lastSeenAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    }, {
        tableName: 'users',
        timestamps: true,
        paranoid: true,

        indexes: [
            {
                unique: true,
                fields: ['username']
            },
            {
                unique: true,
                fields: ['email']
            }
        ]
    });

    Users.associate = (models) => {

        Users.hasMany(models.Follows, {
            foreignKey: 'followingId',
            as: 'followers'
        });

        Users.hasMany(models.Follows, {
            foreignKey: 'followerId',
            as: 'following'
        });

    };

    return Users;
};