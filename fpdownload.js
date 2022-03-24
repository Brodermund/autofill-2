let date = currentDate()
let dwnDate = downloadDate(date)
let finalStorageString = localStorage.getItem("DownloadStr")
let finalStopString = localStorage.getItem("StopStr")
console.log(`Test ${finalStorageString}`)
download(finalStopString, `FP-${dwnDate}-stops.csv`,"csv")
download(finalStorageString, `FP-${dwnDate}.csv`,"csv")
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

  Autofill('')  