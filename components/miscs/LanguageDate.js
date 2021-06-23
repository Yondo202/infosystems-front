import moment from "moment"

const DateFormat = (element) => {
    const dateTimeAgo = moment(element)
    .fromNow()
    .replace("years", "жил")
    .replace("year", "жил")
    .replace("months", "сар")
    .replace("month", "сар")
    .replace("hours", "цаг")
    .replace("hour", "цаг")
    .replace("few seconds","минут")
    .replace("minutes","минут")
    .replace("minute","минут")
    .replace("ago","").replace("days","өдөр").replace("day","өдөр").replace("a ","1 ").replace("an ","1 ");

    return dateTimeAgo
}

export default DateFormat