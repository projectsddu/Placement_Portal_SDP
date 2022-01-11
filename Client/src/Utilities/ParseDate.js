function getTime(date) {
    return date.getHours() + ":" + date.getMinutes()
}


const ParseDate = function (date, time_required = false) {

    try{

        var parse_date = new Date(date)
        parse_date = parse_date.getDate() + "/" + parse_date.getMonth() + "/" + parse_date.getFullYear()
        
        if(time_required) {
            parse_date += " " + getTime(new Date(date))
        }
        
        console.log("Parse date: ", parse_date)
        
        return parse_date
    }
    catch(e) {
        console.log(e.toString());

    }

}

module.exports = ParseDate