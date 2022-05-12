if(document.querySelector("body > table > tbody > tr:nth-child(1) > td:nth-child(1)").innerText === "Line"){
    class Line{
        constructor(Number,Sku,Stop,Bin,Qty){
            this.Number = Number
            this.Sku = Sku
            this.Bin = Bin
            this.Category = Stop
            this.Qty = Qty
        }
    }
    let pieces = 0 
    let Carrier 
    if (window.confirm("FragilePak?")) {Carrier = "FragilePak";}
        else{Carrier = "Odyssey";}  
    let FinalArr = getLines()
    let date = getDate()
    let finalExport = FinalArr.join('\n')
    stringStorage(finalExport,Carrier)
    let downloadDate = date.replace("/",".")
    if(Carrier === "Odyssey"){
        let main = `${date}`
        let str = localStorage.getItem("PicklistStr")
        let finalstr = main.concat("\n",str)
        download(finalstr,`Picklist-${downloadDate}.csv`,'.text/csv;charset=windows-1252')
        localStorage.removeItem("PicklistStr")
    }
    // FUNCTIONS ________________
    function stringStorage(str,carrier){
        if(localStorage.getItem("PicklistStr") === null){
            localStorage.setItem("PicklistStr",str)
        }
        else if (carrier === "FragilePak"){
            let previousStr = localStorage.getItem("PicklistStr")
            console.log(previousStr)
            let finalstr = previousStr.concat("\n",str)
            localStorage.setItem("PicklistStr",finalstr)
        }
        else if (carrier === "Odyssey"){
            let previousStr = localStorage.getItem("PicklistStr") + "\n" + "\n"
            console.log(previousStr)
            let finalstr = previousStr.concat("\n",str)
            localStorage.setItem("PicklistStr",finalstr)
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
        let num = document.querySelector(`body > table > tbody > tr:nth-child(${index}) > td:nth-child(1)`).innerHTML
        let skuArr = skuSplit(index)
        let bin = document.querySelector(`body > table > tbody > tr:nth-child(${index}) > td:nth-child(3)`).innerHTML
        let qty = document.querySelector(`body > table > tbody > tr:nth-child(${index}) > td:nth-child(8)`).innerHTML
        pieces = pieces + Number(qty)
        let newOrder = new Line(num,skuArr[0],skuArr[1],bin,qty)
        console.log(newOrder)
        arr.push(newOrder)
        }
        let FinalArr = [`${Carrier} | Pieces: ${pieces}`, `Manifests: ${finalManifestNum},,`,"Item,Sku,Category,QTY,Bin"]
        for (let i = 0; i < arr.length; i++) {
            const ele = arr[i];
            let pushStr = `${ele.Number},${ele.Sku},${ele.Category},${ele.Qty},${ele.Bin}`
            FinalArr.push(pushStr)
        }
        console.log("getLines Complete")
        return FinalArr
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
}
Autofill('')