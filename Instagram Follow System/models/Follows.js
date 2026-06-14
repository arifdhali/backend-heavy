 
module.exports = (sequelize, DataTypes) => {

    const Follows = sequelize.define(
        "Follows",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },

            followerId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },

            followingId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            tableName: "follows",
            timestamps: true,

            indexes: [
                {
                    unique: true,
                    fields: [
                        "followerId",
                        "followingId"
                    ]
                }
            ]
        }
    );

    Follows.associate = (models) => {

        Follows.belongsTo(
            models.Users,
            {
                foreignKey: "followerId",
                as: "follower"
            }
        );

        Follows.belongsTo(
            models.Users,
            {
                foreignKey: "followingId",
                as: "following"
            }
        );
    };
    return Follows;

    
};