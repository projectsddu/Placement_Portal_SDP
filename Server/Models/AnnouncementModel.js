module.exports = (sequelize, DataTypes) => {

    const Announcement = sequelize.define("Announcement", {

        Announcement_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true // Automatically gets converted to SERIAL for postgres
        },
        Company_ID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Date_of_Visit: {
            type: DataTypes.DATE,
            allowNull: false
        },
        Date_of_announcement: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        Eligible_Branches: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Passed_out_year: {
            type: DataTypes.DATE,
            allowNull: false
        },
        Job_Role: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        Salary: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        Job_Location: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        Bond_Details: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        Other_Details: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        Job_Description_File: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        Registration_Deadline: {
            type: DataTypes.DATE,
            allowNull: false
        },

        // doubt (JHB Sir)
        Eligibility: {
            type: DataTypes.TEXT,
            allowNull: false
        },

        IsOpen: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }

    },
        {
            timestamps: false
        }
    )
    return Announcement
}