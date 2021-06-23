const FormatDate = (string, dotted) => {
    if (dotted) {
        let date = new Date(string)
        date = date.getFullYear() + '.' + (date.getMonth() + 1) + '.' + date.getDate()
        return date
        return
    }
    let date = new Date(string)
    date = date.getFullYear() + ' оны ' + (date.getMonth() + 1) + ' сарын ' + date.getDate()
    return date
}

export default FormatDate