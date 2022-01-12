function getTime(date) {
    return date.getHours() + ":" + date.getMinutes()
}

const ParseDate = function (date, time_required = false) {
    console.log(date)
    try {
        var return_date = ""
        var parse_date = date.split("T");
        var date_part = parse_date[0]
        var time_part = parse_date[1]
        var date_splitted = date_part.split("-")
        return_date += date_splitted[2] + "/" + date_splitted[1] + "/" + date_splitted[0]
        if (time_required) {
            var time_splitted = time_part.split(":")
            return_date += " " + time_splitted[0] + ":" + time_splitted[1]
        }

        return return_date
    }
    catch (e) {
        console.log(e.toString());

    }

}

const getYear = function (date) {
    try {
        var parse_date = date.split("T")[0].split("-");
        return parse_date[0]

    }
    catch (e) {
        console.log(e.toString())
    }
}

module.exports = { ParseDate, getYear }