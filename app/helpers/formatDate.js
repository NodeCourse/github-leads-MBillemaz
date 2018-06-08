function formatDate(date){
    const day = add_zeroes(date.getDate(), 2);
    const month = add_zeroes(date.getMonth() + 1, 2);
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
}

function add_zeroes(string, length) {
    string = "" + string;
    while (string.length < length) {
        string = "0" + string;
    }
    return string;
}

module.exports = formatDate;