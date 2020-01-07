
var getMinutes = function (value) {
    if(value === 0) return 1
    let minutes = ((value / (1000*60)) % 60)
    return minutes
}

var getSeconds = function (value) {
    if(value === 0) return 1
    let seconds = ((value / (1000)))
    return seconds
}

var getMilliSeconds = function (value) {
    let millis = value * 60 * 1000
    return millis
}

var getMilliSecondsFromSeconds = function (value) {
    let millis = value * 1000;
    return millis
}

var getPercentageCompleted = function (obtained,total) {
    var percent = obtained*100/total;
    return 100 - percent.toFixed(0)
}

exports.getMinutes = getMinutes
exports.getSeconds = getSeconds
exports.getMilliSeconds = getMilliSeconds
exports.getMilliSecondsFromSeconds = getMilliSecondsFromSeconds
exports.getPercentageCompleted = getPercentageCompleted