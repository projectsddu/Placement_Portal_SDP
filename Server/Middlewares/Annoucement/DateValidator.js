const DateValidator = async (req, res, next) => {
    try {

        let date_of_visit = req.body.Date_of_Visit
        let date_of_annoucement = req.body.Date_of_announcement

        if(date_of_visit < date_of_annoucement) {
            throw "Date of visit can not be lesser than date of annoucement!!"
        }

        next()
    }
    catch (e) {
        console.log(e.toString())
        return res.json({ status: false, data: e.toString() })
    }
}

module.exports = DateValidator