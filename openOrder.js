let tracking = window.prompt("tracking")
document.querySelector("body > form > table > tbody > tr:nth-child(3) > td > input[type=text]").value = tracking
document.querySelector("body > form > table > tbody > tr:nth-child(10) > td > input[type=submit]").click()
let orderstatus
let order = window.prompt("Order Number")
window.open(`https://staff.eshopperpro.com/trackingNumbers.php?e=add&orderId=${order}`)
