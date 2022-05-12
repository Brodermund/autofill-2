function getStatus(table,i){
    let firstStatus = document.querySelector(`body > table:nth-child(${table}) > tbody > tr:nth-child(${i}) > td:nth-child(5)`).innerHTML
    let statusArr = firstStatus.split("<br>")
    let statusStr = statusArr[4].trim()
    return statusStr
}

let firstStatus = document.querySelector("body > table:nth-child(33) > tbody > tr:nth-child(2) > td:nth-child(5)").innerHTML
let statusArr = firstStatus.split("<br>")
let statusStr = statusArr[4].trim()
console.log(statusStr)
