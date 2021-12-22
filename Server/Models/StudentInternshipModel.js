module.exports = (sequelize, DataTypes) => {
    const StudentInternship = sequelize.define("StudentInternship", {
        Student_ID: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Company_ID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Stipend: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        Project_Title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Internal_Guide_ID: {
            type: DataTypes.STRING,
            allowNull: false
        },
        External_Guide_Name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        External_Guide_Mobile_Number: {
            type: DataTypes.STRING,
            allowNull: false
        },
        External_Guide_Email_ID: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false   
    })
    return StudentInternship
}