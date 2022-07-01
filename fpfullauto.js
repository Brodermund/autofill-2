let table = testPaths()
let finalManifest = getManifest(table) // Get Mainfest
let numOrders = getNumOrders(table)
// ______________Declare variables classes and empty arrays__________
let loadedStopArr = []
let pickedStopArr = []
let objArr = []
let orderArr =[]
class Line{
    constructor(Order,Sku,Qty,Weight){
        this.Order = Order
        this.Sku = Sku
        this.Qty = Qty
        this.Weight = Weight
    }
}
class Order{
    constructor(Order,Stop,Qty,Weight,Status){
        this.Order = Order
        this.Stop = Stop
        this.Qty = Qty
        this.Weight = Weight
        this.Status = Status
    }
}
// ______________loop through orders table__________
let orderNumArr = []
let exportArr = []
for (let i = 0; i < numOrders; i++) {
    let index = (i*5)+2
    let orderParts = getOrderParts(table,index)
    if(orderParts.Status === "Loaded"){
        loadedStopArr.push(orderParts.Stop)
        let interWt = Number(orderParts.Weight/orderParts.Qty).toFixed(0)
        let skutable = document.querySelector(`body > table:nth-child(${table}) > tbody > tr:nth-child(${index+1}) > td > b > table`).rows.length - 1
        for (let j = 0; j < skutable; j++) {
            let newLine = getSkuParts(orderParts.Order,table,index,j,interWt)
            if (newLine != false){
                objArr.push(newLine)
            }
            else{
                continue   
            }     
        }
    }
    else if(orderParts.Status === "Picked" ){
        pickedStopArr.push(orderParts.Stop)
    }
    else{
        continue
    }
}

let finalLoadString = getStopString(loadedStopArr,finalManifest)
let finalPickString = getStopString(pickedStopArr,finalManifest)
console.log(objArrToStr(objArr))
stringStorage(objArrToStr(objArr))
loadStopStorage(finalLoadString)
pickStopStorage(finalPickString)
// vvv----Functions----vvv 
function getManifest(i){
    let manIndex = i - 11
    let rawMan = String(document.querySelector(`body > table:nth-child(${manIndex}) > tbody > tr > td:nth-child(2) > h3`).innerHTML).split(" ")
    let interMan = String(rawMan[2]).split("&")
    let finalManifest = interMan[0]
    return finalManifest
}
function testPaths(){
    for(let i = 30; i < 40;i++){
        let test = document.querySelector(`body > table:nth-child(${i}) > tbody > tr:nth-child(1) > td:nth-child(1)`).innerHTML
        if(test === "#"){
            return i
        }
        else{
            continue
        }
    }
    window.alert("Table index not found")
    return false
}
function getSkuParts(ordernum,table,i,l,interWt){
    let index = i+1
    let j = l + 2
    let intersku = document.querySelector(`body > table:nth-child(${table}) > tbody > tr:nth-child(${index}) > td > b > table > tbody > tr:nth-child(${j}) > td:nth-child(2) > div > span > b`).innerText
    let qty = document.querySelector(`body > table:nth-child(${table}) > tbody > tr:nth-child(${index}) > td > b > table > tbody > tr:nth-child(${j}) > td:nth-child(1) > b`).innerText
    let itemCheck = String(document.querySelector(`body > table:nth-child(${table}) > tbody > tr:nth-child(${index}) > td > b > table > tbody > tr:nth-child(${j}) > td:nth-child(4)`).innerText)
    let downloadWt = interWt * qty
    let sku = intersku.replace("Signature Design by Ashley","Signature Design")
    if (itemCheck.includes("✅")){
        let newLine = new Line(ordernum,sku,qty,downloadWt)
        return newLine
    }
    else{
        return false   
    }     
}
function getOrderParts(table,i){
    let ordernum = document.querySelector(`body > table:nth-child(${table}) > tbody > tr:nth-child(${i}) > td:nth-child(3) > p > font > strong > a`).innerText
    let stop = document.querySelector(`body > table:nth-child(${table}) > tbody > tr:nth-child(${i}) > td:nth-child(1) > a`).innerText
    let pcwtArr =  getWeight(document.querySelector(`body > table:nth-child(${table}) > tbody > tr:nth-child(${i}) > td:nth-child(2)`).innerHTML)
    let weight = pcwtArr[1]
    let pcs = pcwtArr[0]
    let firstStatus = document.querySelector(`body > table:nth-child(${table}) > tbody > tr:nth-child(${i}) > td:nth-child(5)`).innerHTML
    let statusArr = firstStatus.split("<br>")
    let statusStr = statusArr[4].trim()
    let order = new Order(ordernum,stop,pcs,weight,statusStr)
    return order
}
function getStatus(table,i){
    let firstStatus = document.querySelector(`body > table:nth-child(${table}) > tbody > tr:nth-child(${i}) > td:nth-child(5)`).innerHTML
    let statusArr = firstStatus.split("<br>")
    let statusStr = statusArr[4].trim()
    return statusStr
}
function getStopString(arr,man){
    let finalStopArr = []
    
    if (arr.length == 0){
        return `${man},""`
    }
    else{
        let interStopArr = arr.sort((a, b) => a - b)
        let currentStop = 0
        let newStop = 1
        let last = interStopArr[interStopArr.length - 1]
        for(let i = 0;i< arr.length;i++){
            if(interStopArr[i] - currentStop === 1){
                currentStop = interStopArr[i]
            }
            else{
                if(newStop != currentStop){
                    finalStopArr.push(`="${newStop}-${currentStop}"`)
                    newStop = interStopArr[i]
                    currentStop = interStopArr[i]
                }
                else{
                    finalStopArr.push(interStopArr[i])
                    newStop = interStopArr[i]
                    currentStop = interStopArr[i]
                }
            }
        }
        if(newStop != currentStop){
            finalStopArr.push(`="${newStop}-${currentStop}"`)
        }
        else{
            finalStopArr.push(currentStop)
        }
        let stopArrStr = finalStopArr.join(";")
        let finalStopStr = `${man},${stopArrStr}`
        return finalStopStr
    }   
}
function loadStopStorage(str){
    if(localStorage.getItem("LoadStr") === null){
        localStorage.setItem("LoadStr",str)
    }
    else{
        let previousStr = localStorage.getItem("LoadStr")
        console.log(previousStr)
        let finalstr = previousStr.concat("\n",str)
        localStorage.setItem("LoadStr",finalstr)
    }
}
function pickStopStorage(str){
    if(localStorage.getItem("PickStr") === null){
        localStorage.setItem("PickStr",str)
    }
    else{
        let previousStr = localStorage.getItem("PickStr")
        console.log(previousStr)
        let finalstr = previousStr.concat("\n",str)
        localStorage.setItem("PickStr",finalstr)
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
function getNumOrders(i){
    let index = i - 3
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
