let d = new Date()
let month = d.getMonth() + 1
let currentDay = d.getDate()
let fromDay
let toDay
let year = d.getFullYear()
let fromMonth


if(currentDay > 30){
    fromDay = "01"
    toDay = "31"
    fromMonth = month
}
else {
    fromDay = String(getFromDay(d)).padStart(2,"0")
    toDay = String(currentDay).padStart(2,"0")
    fromMonth = month - 1
}
let fromArg = `${fromMonth}/${fromDay}/${year}`
let toArg = `${month}/${currentDay}/${year}`

console.log(fromArg)
console.log(toArg)
document.getElementById("manifest_picklist_status").value = "all_not_closed"
document.getElementById("manifest_date_from").value = "all"
document.getElementById("q_custom_date_from").value = fromArg
document.getElementById("q_custom_date_to").value = toArg
document.querySelector("body > table:nth-child(1) > tbody > tr > td:nth-child(2) > div.marge-top.text-align-center > div").click()
Autofill('')

function getFromDay(d){
    let month = d.getMonth() + 1
    let day = d.getDate()
    const daysinMonth = [31,28,31,30,31,30,31,31,30,31,30,31]
    let prevTotal = daysinMonth[month-2]
    let subtract = 30 - day
    let fromDay = prevTotal - subtract
    return String(fromDay)
}