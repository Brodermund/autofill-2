pageLoadNumber()
let totalOpenedManifests = localStorage.getItem("totalManifests")
let loadNumber = localStorage.getItem("LoadOrder")
console.log(loadNumber)

let scans = Number(document.querySelector("#manfiest-history-log > table").rows.length) - 1
class Line{
    constructor(Order,Sku,Qty,Weight){
        this.Order = Order
        this.Sku = Sku
        this.Qty = Qty
        this.Weight = Weight
    }
}
let numOrders = getNumOrders()
let rawMan = String(document.querySelector("body > table:nth-child(21) > tbody > tr > td:nth-child(2) > h3").innerHTML).split(" ")
let interMan = String(rawMan[2]).split("&")
let finalManifest = interMan[0]
let stopArr = []
console.log(finalManifest)
let objArr = []
let orderArr =[]
let weightCount= 0
let pcCount = 0
// console.log(scans)
let date = "2/10/2022"
console.log(date)
for (let i = 0; i < scans; i++) {
    let index = i+2
    let scanD = getScanDate(document.querySelector(`#manfiest-history-log > table > tbody > tr:nth-child(${index}) > td:nth-child(2)`).innerText)
    let scanDate = scanD.substring(1)
    console.log(scanDate)
    if (scanDate === date) {
        let order = document.querySelector(`#manfiest-history-log > table > tbody > tr:nth-child(${index}) > td:nth-child(4)`).innerText
        // console.log(order)
        // console.log(orderArr)
        if(orderArr.indexOf(order) !== -1){
            continue
        } else{
            orderArr.push(order)
        }
    }
    else if(scanDate === null){
        // console.log("scanDate = null")
        continue
        
    }
    else{
        // console.log("scanDate issue")
        continue
    }
}
let orderNumArr = []
let exportArr = []
for (let i = 0; i < numOrders; i++) {
    let table = 32
    let index = (i*5)+2
    // console.log(i)
    
    let orderNum = document.querySelector(`body > table:nth-child(${table}) > tbody > tr:nth-child(${index}) > td:nth-child(3) > p > font > strong > a`).innerText
    let stop = document.querySelector(`body > table:nth-child(${table}) > tbody > tr:nth-child(${index}) > td:nth-child(1) > a`).innerText
    let pcwtArr =  getWeight(document.querySelector(`body > table:nth-child(${table}) > tbody > tr:nth-child(${index}) > td:nth-child(2)`).innerHTML)
    let weight = pcwtArr[1]
    let pcs = pcwtArr[0]
    let interWt = Number(weight/pcs).toFixed(0)
    if(orderArr.indexOf(orderNum) !== -1){
        weightCount = Number(weightCount) + Number(weight)
        pcCount = Number(pcCount) + Number(pcs)
        let skutable = document.querySelector(`body > table:nth-child(32) > tbody > tr:nth-child(${index+1}) > td > b > table`).rows.length - 1
        for (let j = 0; j < skutable; j++) {
            let sku = document.querySelector(`body > table:nth-child(32) > tbody > tr:nth-child(${index+1}) > td > b > table > tbody > tr:nth-child(${j+2}) > td:nth-child(2) > div > span > b`).innerText
            let qty = document.querySelector(`body > table:nth-child(32) > tbody > tr:nth-child(${index+1}) > td > b > table > tbody > tr:nth-child(${j+2}) > td:nth-child(1) > b`).innerText
            let itemCheck = String(document.querySelector(`body > table:nth-child(32) > tbody > tr:nth-child(${index+1}) > td > b > table > tbody > tr:nth-child(${j+2}) > td:nth-child(4)`).innerText)
            let downloadWt = interWt * qty
            if (itemCheck.includes("✅")){
                let newLine = new Line(orderNum,sku,qty,downloadWt)
                objArr.push(newLine)
            }
            else{
                continue
                
            }

            
        }
        stopArr.push(stop)
        document.querySelector(`body > table:nth-child(${table}) > tbody > tr:nth-child(${index}) > td:nth-child(5) > div > input`).click()
    } else{
        continue
    }
}
let interStopArr = stopArr.sort((a, b) => a - b)
let finalStopArr = interStopArr.join(",")
let finalStopStr = `${finalManifest},${finalStopArr}`
console.log("Stop Numbers")
console.log('--------------------------')
console.log(finalStopArr)
console.log('--------------------------')
pieceWeightHTML(pcCount,weightCount)
let downloadString = objArrToStr(objArr)
let dwnDate = downloadDate(date)
if(pcCount === 0){
    if(loadNumber === totalOpenedManifests){
        let finalStorageString = localStorage.getItem("DownloadStr")
        let finalStopString = localStorage.getItem("StopStr")
        download(finalStopString, `FP-${finalManifest}-stops.csv`,"csv")
        download(finalStorageString, `FP-${dwnDate}.csv`,"csv")
        localStorage.removeItem("DownloadStr")
        localStorage.removeItem("LoadOrder")
        localStorage.removeItem("StopStr")
    }
    window.close()

}
else{
    stringStorage(downloadString)
    manifestScanStorage(finalStopStr)
    if(loadNumber === totalOpenedManifests){
        let finalStorageString = localStorage.getItem("DownloadStr")
        let finalStopString = localStorage.getItem("StopStr")
        download(finalStopString, `FP-${finalManifest}-stops.csv`,"csv")
        download(finalStorageString, `FP-${dwnDate}.csv`,"csv")
        localStorage.removeItem("DownloadStr")
        localStorage.removeItem("LoadOrder")
        localStorage.removeItem("StopStr")
    }
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
    document.querySelector("body > table:nth-child(29) > tbody > tr:nth-child(2) > td:nth-child(2)").innerText = "Pieces"
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
function getNumOrders(){
    let input = document.querySelector("body > table:nth-child(29) > tbody > tr:nth-child(2) > td:nth-child(1)").innerText
    let inputArr = String(input).split('\n')
    let items = Number(inputArr[1])
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
function download(data, filename, type) {
    let file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}
function downloadDate(date){
    let arg1 = date.split("/")
    let arg2 = `${arg1[0]}.${arg1[1]}`

    return arg2
    
}


