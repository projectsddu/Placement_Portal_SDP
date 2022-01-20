module.exports = (sequelize, DataTypes) => {

    const Subscribe = sequelize.define("AnnouncmentSubsribe", {
        Announcement_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true // Automatically gets converted to SERIAL for postgres
        },
        Student_ID: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
        {
            timestamps: false
        }
    )

    return Subscribe
}