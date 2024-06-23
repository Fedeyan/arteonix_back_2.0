import { Model } from "sequelize";

module.exports = (sequelize, DataTypes) => {
    class TokensBlacklist extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    TokensBlacklist.init(
        {
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                unique: true
            },
            token: {
                type: DataTypes.STRING,
                unique: true,
            }
        },
        {
            sequelize,
            modelName: "TokensBlacklist",
        }
    );
    return TokensBlacklist;
};
