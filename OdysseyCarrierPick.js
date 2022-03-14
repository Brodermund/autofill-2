class Line{
    constructor(Sku,Descr,Qty,){
        this.Descr = Descr
        this.Sku = Sku
        this.Qty = Qty
    }
}

let promptinput = window.prompt("Array")
let CombinedArray = promptinput.split("$")
let orderArr = String(CombinedArray[0]).split(",")
let estesArr = String(CombinedArray[1]).split(",")
let daytonArr = String(CombinedArray[2]).split(",")
let xpoArr = String(CombinedArray[3]).split(",")
let RRArr = String(CombinedArray[4]).split(",")
let otherrArr = String(CombinedArray[5]).split(",")
let rawMan = String(document.querySelector("body > table:nth-child(21) > tbody > tr > td:nth-child(2) > h3").innerHTML).split(" ")
let interMan = String(rawMan[2]).split("&")
let finalManifest = interMan[0]

let finalEstesArr = []
let finalDaytonArr = []
let finalXPOArr = []
let finalRRArr = []
let finalOtherArr = []
let FinalArr = []
let input = document.querySelector("body > table:nth-child(29) > tbody > tr:nth-child(2) > td:nth-child(1)").innerText
let inputArr = String(input).split('\n')
let numOrders = Number(inputArr[1])
let orderNumArr = []
let exportArr = []
for (let i = 0; i < numOrders; i++) {
    let table = 32
    let index = (i*5)+2
    let orderNum = document.querySelector(`body > table:nth-child(${table}) > tbody > tr:nth-child(${index}) > td:nth-child(3) > p > font > strong > a`).innerText
    let skutable = document.querySelector(`body > table:nth-child(32) > tbody > tr:nth-child(${index+1}) > td > b > table`).rows.length - 1
    for (let j = 0; j < skutable; j++) {
        let sku = document.querySelector(`body > table:nth-child(32) > tbody > tr:nth-child(${index+1}) > td > b > table > tbody > tr:nth-child(${j+2}) > td:nth-child(2) > div > span > b`).innerText
        let qty = document.querySelector(`body > table:nth-child(32) > tbody > tr:nth-child(${index+1}) > td > b > table > tbody > tr:nth-child(${j+2}) > td:nth-child(1) > b`).innerText
        let descr = document.querySelector(`body > table:nth-child(32) > tbody > tr:nth-child(${index+1}) > td > b > table > tbody > tr:nth-child(${j+2}) > td:nth-child(3)`).innerText
        let itemCheck = document.querySelector(`body > table:nth-child(32) > tbody > tr:nth-child(${index+1}) > td > b > table > tbody > tr:nth-child(${j+2}) > td:nth-child(4)`).innerText
        if (itemCheck === "-"){
            continue
        }
        else{
            let newLine = new Line(sku,descr,qty)
            let orderIndex = String(orderArr.indexOf(String(orderNum)))
            if(estesArr.includes(orderIndex)){
                finalEstesArr.push(newLine)
            }
            else if(daytonArr.includes(orderIndex)){
                finalDaytonArr.push(newLine)
            }
            else if(xpoArr.includes(orderIndex)){
                finalXPOArr.push(newLine)
            }
            else if(RRArr.includes(orderIndex)){
                finalRRArr.push(newLine)
            }
            else if(otherrArr.includes(orderIndex)){
                finalOtherArr.push(newLine)
            }
            else{console.log("no final")}
        }  
    }
    document.querySelector(`body > table:nth-child(${table}) > tbody > tr:nth-child(${index}) > td:nth-child(5) > div > input`).click()
}
FinalArr.push(finalEstesArr,finalDaytonArr,finalXPOArr,finalRRArr,finalOtherArr)
let downloadString = objArrToStr(FinalArr)
console.log(FinalArr)
console.log(downloadString)
download(downloadString, `Odyssey-${finalManifest}(Carriers).csv`,"csv")
function objArrToStr(arr){
    let downloadArr = []
    let carrierArr = ["Estes","Dayton","XPO","Roadrunner","Other"]
    for(let j= 0; j< arr.length;j++){
        let looplength = arr[j].length
        downloadArr.push(carrierArr[j])
        for( let i = 0; i < looplength;i++){
        let line = arr[j][i]
        let pushString = `${line.Sku},${line.Descr},${line.Qty}`
        downloadArr.push(pushString)
        }
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