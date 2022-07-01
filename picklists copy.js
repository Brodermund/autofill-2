if(document.querySelector("body > table > tbody > tr:nth-child(1) > td:nth-child(1)").innerText === "Line"){
    class Line{
        constructor(Sku,Stop,Bin,Qty){
            this.Sku = Sku
            this.Bin = Bin
            this.Category = Stop
            this.Qty = Qty
        }
    }
    let pieces = 0 
    let Carrier 
    let FinalArr = getLines()
    let date = getDate()
    let finalExport = FinalArr.join('\n')
    stringStorage(finalExport,Carrier)
    // FUNCTIONS ________________
    function stringStorage(str,carrier){
        if(localStorage.getItem("FP Picklist") === null){
            localStorage.setItem("FP Picklist",str)
        }
        else {
            localStorage.removeItem("FP Picklist")
            localStorage.setItem("FP Picklist",str)
        }
        console.log("stringStorage Complete")
    } 
    function getLines(){
        let finalManifestNum = getManifestArr()
        let loopLength = document.querySelector("body > table > tbody").rows.length - 1
        console.log(loopLength)
        let arr = []
        for (let i = 0; i < loopLength; i++) {
        let index = i + 2
        let skuArr = skuSplit(index)
        let sku = String(skuArr[0]).replace("Signature Design by Ashley","Signature Design")
        let bin = getBinStr(index)
        let qty = document.querySelector(`body > table > tbody > tr:nth-child(${index}) > td:nth-child(8)`).innerHTML
        pieces = pieces + Number(qty)
        let newOrder = new Line(sku,skuArr[1],bin,qty)
        arr.push(newOrder)
        }
        let sortedArr = arr.sort(dynamicSort("Bin"))
        console.log(sortedArr)
        let FinalArr = [`FragilePak | Pieces: ${pieces}`, `Manifests: ${finalManifestNum},,`,"Item,Sku,Category,QTY,Bin"]
        let number = 1
        for (let i = 0; i < arr.length; i++) {
            const ele = arr[i];
            let pushStr = `${number++},${ele.Sku},${ele.Category},${ele.Qty},${ele.Bin}`
            FinalArr.push(pushStr)
        }
        console.log("getLines Complete")
        return FinalArr
    }
    function getBinStr(index){
        let finalArr = []
        let interbin = document.querySelector(`body > table > tbody > tr:nth-child(${index}) > td:nth-child(3)`).innerHTML
        let midbin = interbin.replace(/<br>/gi,"|")
        let binArr = midbin.split("|")
        for(let i = 0; i < binArr.length;i++){
            if(charIsLetter(binArr[i][1])){
                finalArr.push(binArr[i])
            }
            else{
                let newBin = binArr[i].replace(/0101/gi,"")
                finalArr.push(newBin)
            }
        }
        let finalStr = finalArr.join(" | ")
        return finalStr
    }
    function getManifestArr(){
        let rawManifestNum = document.querySelector("body > b").innerText
        let manifestArr = String(rawManifestNum).split(':')  
        let interManifestNum = String(manifestArr[1]).replace(" [",'')
        let interManifestNum2 = String(interManifestNum).replace(/,/g,' | ')
        let finalManifestNum = String(interManifestNum2).replace("]",'')
        console.log("getManifestArr Complete")
        return finalManifestNum
    }
    function skuSplit(index){
        let skuArr = []
        let str = document.querySelector(`body > table > tbody > tr:nth-child(${index}) > td:nth-child(2)`).innerHTML
        let arr1 = str.split("(")
        skuArr.push(arr1[0])
        let arr2 = String(arr1[1]).split(")")
        skuArr.push(arr2[0])
        console.log("skuSplit Complete")
        return skuArr
    }
    function getDateDownload(){
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let getDate = String(new Date())
        dateArr = getDate.split(" ")
        let rawMonth = months.indexOf(dateArr[1])
        let m = rawMonth + 1 
        let d = dateArr[2]
        let date = `${m}.${d}`
        return date
    }
    function getDate(){
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let getDate = String(new Date())
        dateArr = getDate.split(" ")
        let rawMonth = months.indexOf(dateArr[1])
        let m = rawMonth + 1 
        let d = dateArr[2]
        let date = `${m}/${d}`
        return date
    }
    function charIsLetter(char) {
        if (typeof char !== 'string') {
          return false;
        }
      
        return char.toLowerCase() !== char.toUpperCase();
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
    function dynamicSort(property) {
        var sortOrder = 1;
        if(property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a,b) {
            /* next line works with strings and numbers, 
             * and you may want to customize it to your needs
             */
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }
}
Autofill('')