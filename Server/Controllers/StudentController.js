const db = require("../Models")
const Student = db.students
const Announcement = db.announcements

const addStudent = async (req, res) => {
    Student.create({
        firstName: "Jenil",
        lastName: "Gandhi"
    })
    let data = await Student.findAll({ where: { lastName: "Gandhi" } })
    return res.send(data)
}

module.exports = {
    addStudent
}