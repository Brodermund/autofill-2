let table
let numorderindex
let manIndex
let ManifestOpen = document.querySelector("body > table:nth-child(17) > tbody > tr > td").innerText
console.log(ManifestOpen)
if (ManifestOpen === "STATUS : [Closed]"){
    table = 33
    numorderindex = 30
    manIndex = 22
}
else{
    table = 33
    numorderindex = 30
    manIndex = 22
}
pageLoadNumber()
let numOrders = getNumOrders(numorderindex)
let totalOpenedManifests = localStorage.getItem("totalManifests")
let loadNumber = localStorage.getItem("LoadOrder")
let scans = Number(document.querySelector("#manfiest-history-log > table").rows.length)+1
console.log(scans)
class Line{
    constructor(Order,Sku,Qty,Weight){
        this.Order = Order
        this.Sku = Sku
        this.Qty = Qty
        this.Weight = Weight
    }
}
// ______________Get and Parse Manifest__________
let rawMan = String(document.querySelector(`body > table:nth-child(${manIndex}) > tbody > tr > td:nth-child(2) > h3`).innerHTML).split(" ")
let interMan = String(rawMan[2]).split("&")
let finalManifest = interMan[0]
// ______________________________________________
// ______________Declare variables and empty arrays__________
let missedStopArr = []
let loadedStopArr = []
let objArr = []
let orderArr =[]
let weightCount= 0
let pcCount = 0
// ______________loop through orders table__________
let orderNumArr = []
let exportArr = []
for (let i = 0; i < numOrders; i++) {
    let index = (i*5)+2
    let orderNum = document.querySelector(`body > table:nth-child(${table}) > tbody > tr:nth-child(${index}) > td:nth-child(3) > p > font > strong > a`).innerText
    console.log(orderNum)
    let status = getStatus(table,index)
    if(status != "Loaded"){
        continue
    }
    else{
        let stop = document.querySelector(`body > table:nth-child(${table}) > tbody > tr:nth-child(${index}) > td:nth-child(1) > a`).innerText
        let pcwtArr =  getWeight(document.querySelector(`body > table:nth-child(${table}) > tbody > tr:nth-child(${index}) > td:nth-child(2)`).innerHTML)
        let weight = pcwtArr[1]
        let pcs = pcwtArr[0]
        let interWt = Number(weight/pcs).toFixed(0)
            weightCount = Number(weightCount) + Number(weight)
            pcCount = Number(pcCount) + Number(pcs)
            let skutable = document.querySelector(`body > table:nth-child(${table}) > tbody > tr:nth-child(${index+1}) > td > b > table`).rows.length - 1
            for (let j = 0; j < skutable; j++) {
                let intersku = document.querySelector(`body > table:nth-child(${table}) > tbody > tr:nth-child(${index+1}) > td > b > table > tbody > tr:nth-child(${j+2}) > td:nth-child(2) > div > span > b`).innerText
                let qty = document.querySelector(`body > table:nth-child(${table}) > tbody > tr:nth-child(${index+1}) > td > b > table > tbody > tr:nth-child(${j+2}) > td:nth-child(1) > b`).innerText
                let itemCheck = String(document.querySelector(`body > table:nth-child(${table}) > tbody > tr:nth-child(${index+1}) > td > b > table > tbody > tr:nth-child(${j+2}) > td:nth-child(4)`).innerText)
                let downloadWt = interWt * qty
                let sku = intersku.replace("Signature Design by Ashley","Signature Design")
                if (itemCheck.includes("✅")){
                    let newLine = new Line(orderNum,sku,qty,downloadWt)
                    objArr.push(newLine)
                }
                else{
                    continue   
                }     
            }
        loadedStopArr.push(stop)
    }
}

let finalStopString = getStopString(loadedStopArr,finalManifest)
console.log(finalStopString)
let downloadString = objArrToStr(objArr)

if(pcCount === 0){
    window.close()
}
else{
    stringStorage(downloadString)
    manifestScanStorage(finalStopString)
}
// vvv----Functions----vvv 
function getStatus(table,i){
    let firstStatus = document.querySelector(`body > table:nth-child(${table}) > tbody > tr:nth-child(${i}) > td:nth-child(5)`).innerHTML
    let statusArr = firstStatus.split("<br>")
    let statusStr = statusArr[4].trim()
    return statusStr
}

function getStopString(arr,man){
    let interStopArr = arr.sort((a, b) => a - b)
    let stopArrStr = interStopArr.join(";")
    let finalStopArr
    if(interStopArr.length === numOrders){
        finalStopArr = `${stopArrStr}, All BoLs`
    }
    else{
        finalStopArr = stopArrStr
    }
    let finalStopStr = `${man},${finalStopArr}`
    return finalStopStr

}
function pageLoadNumber(){
    let current 
    if(localStorage.getItem("LoadOrder") === null){
        localStorage.setItem("LoadOrder","1")
        current = 1 
    }
    else{
        let previousload = localStorage.getItem("LoadOrder")
        current = Number(previousload) + 1
        let currentload = String(current)
        localStorage.setItem("LoadOrder",currentload)
    }
    return current
}
function manifestScanStorage(str){
    if(localStorage.getItem("StopStr") === null){
        localStorage.setItem("StopStr",str)
    }
    else{
        let previousStr = localStorage.getItem("StopStr")
        console.log(previousStr)
        let finalstr = previousStr.concat("\n",str)
        localStorage.setItem("StopStr",finalstr)
    }
}
function stringStorage(str){
    if(localStorage.getItem("DownloadStr") === null){
        localStorage.setItem("DownloadStr",str)
    }
    else{
        let previousStr = localStorage.getItem("DownloadStr")
        console.log(previousStr)
        let finalstr = previousStr.concat("\n",str)
        localStorage.setItem("DownloadStr",finalstr)
    }
} 
function pieceWeightHTML(pcCount,weightCount){
    document.querySelector("#num_bol_needed").value = 1
    document.querySelector(`body > table:nth-child(29) > tbody > tr:nth-child(2) > td:nth-child(2)`).innerText = "Pieces"
    document.querySelector("body > table:nth-child(29) > tbody > tr:nth-child(2) > td:nth-child(3)").innerText = pcCount
    document.querySelector("body > table:nth-child(29) > tbody > tr:nth-child(2) > td:nth-child(4)").innerText = ""
    document.querySelector("body > table:nth-child(29) > tbody > tr:nth-child(2) > td:nth-child(5)").innerText = ""
    document.querySelector("body > table:nth-child(29) > tbody > tr:nth-child(2) > td:nth-child(6)").innerText = "Weight"
    document.querySelector("body > table:nth-child(29) > tbody > tr:nth-child(2) > td:nth-child(7)").innerText = weightCount.toFixed(0)
}
function getWeight(str){
    let split = String(str).split("<br>")
    let weightStr = split[3]
    let splitWeight = weightStr.split(": ")
    let weight = splitWeight[1]
    let pieceStr = split[2]
    let splitPcs = pieceStr.split(": ")
    let Pcs = splitPcs[1]
    return [Pcs,weight]
}
function currentDate(){
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    getDate = String(new Date())
    dateArr = getDate.split(" ")
    let rawMonth = months.indexOf(dateArr[1])
    let m = rawMonth + 1 
    let d = dateArr[2]
    let y = dateArr[3]
    let date = `${m}/${d}/${y}`
    return date
  }
function getScanDate(str){
    let interArr = str.split(" ")
    let date = interArr[0]
    return date
}
function getNumOrders(index){
    let input = document.querySelector(`body > table:nth-child(${index}) > tbody > tr:nth-child(2) > td:nth-child(1)`).innerText
    let inputArr = String(input).split('\n')
    let items = Number(inputArr[1])
    if (items === 0){window.close()}
    return items
}
function objArrToStr(arr){
    let downloadArr = []
    for( let i = 0; i < arr.length;i++){
      let line = arr[i]
      let pushString = `${line.Order},${line.Sku},${line.Qty},${line.Weight}`
      downloadArr.push(pushString)
    }
    let finalString = downloadArr.join("\n")
    let downloadString = finalString.replace(/['"]+/g, '')
    return downloadString
  }



