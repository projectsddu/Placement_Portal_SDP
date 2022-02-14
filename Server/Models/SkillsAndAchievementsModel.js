module.exports = (sequelize, DataTypes) => {
    const SkillsAndAchievements = sequelize.define("SkillsAndAchievements", {
        Student_ID: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Programming_Language_Skills: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Web_Development_Skills: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Database_Skills: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Competitive_Coding_Achievements: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Other_Achievements: {
            type: DataTypes.STRING,
            allowNull: false
        },
        GRE_Score: {
            type: DataTypes.STRING,
            allowNull: false
        },
        TOEFL_Score: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        IELTS_Score: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        GATE_Score: {
            type: DataTypes.DOUBLE,
            allowNull: false
        }
    }, {
        timestamps: false   
    })
    return SkillsAndAchievements
}