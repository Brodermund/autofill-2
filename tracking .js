let rawTracking = window.prompt("tracking")
let carrierArr = carrierSelection(rawTracking)
let carrier = carrierArr[0]
let tracking = carrierArr[1]
window.alert(`Carrier: ${carrier}\nTracking: ${tracking}`)

// document.querySelector("body > form > table > tbody > tr:nth-child(3) > td > input[type=text]").value = tracking
// document.querySelector("body > form > table > tbody > tr:nth-child(10) > td > input[type=submit]").click()
// let orderstatus
// let order = window.prompt("Order Number")
// window.open(`https://staff.eshopperpro.com/trackingNumbers.php?e=add&orderId=${order}`)


function carrierSelection(str){
    let carrier
    let finalTracking
    let first3 = String(str).slice(0,3)
    if(first3 === "561"){
        finalTracking =  String(str).slice(0,-1)
        carrier = "Roadrunner"
    }
    else if(first3 === "677"){
        finalTracking = str
        carrier = "YRC"
    }
    else if(first3 === "006"){
        finalTracking =  String(str).slice(2)
        carrier = "Dayton"
    }
    else if(first3 === "064"){
        finalTracking = str
        carrier = "Estes"
    }
    else if(first3 === "780"){
        finalTracking = str
        carrier = "XPO"
    }
    else if(first3 === "609"){
        finalTracking = str
        carrier = "Holland"
    }
    else if(first3 === "203"){
        finalTracking = str
        carrier = "TForce"
    }
    return [carrier,finalTracking]
}