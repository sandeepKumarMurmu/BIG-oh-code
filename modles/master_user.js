
module.exports = (sequelize, DataTypes) => {
    const master_user = sequelize.define('master_user',
        {
            uniqueId: {
                type: DataTypes.STRING(100),
                allowNull: false,
                primaryKey: true,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                unique: true,
            },
            title: {
                type: DataTypes.STRING(100),
                allowNull: false,
                unique: 'master_user_unique_1',
            },
            name: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },
            email: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },
            phonenumber: {
                type: DataTypes.STRING(16),
                allowNull: true,
            },
            isGraduate: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false,
            },
            createdDate: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            },
            updatedDate: {
                type: DataTypes.DATE,
                // defaultValue: DataTypes.NOW
            }
        },
        {
            tableName: 'master_user',
            collate: 'utf8mb4_0900_ai_ci', // Optional: Set collate
            charset: 'utf8mb4', // Optional: Set charset
            comment: 'test', // Optional: Set table comment
            timestamps: false, // Set to true if you want Sequelize to manage created_at and updated_at fields
        });

    return master_user
}
