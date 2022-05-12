let label = document.getElementById('label.trackingNumber')
if (label != null) {
    let rawOrder = window.prompt("Enter Name")
    let order = rawOrder
    if (document.querySelector("#labelData\\.labelPagination") != null){
        let options = document.querySelector("#labelData\\.labelPagination").children
        let valueArr = []
        let urlValueArr = []
        for (let i = 0; i < options.length; i++) {
            valueArr.push(options[i].value)
        }
        console.log(valueArr)
        for (let i = 0; i < valueArr.length; i++) {
            let item = String(valueArr[i]).split(",")
            urlValueArr.push(item[1])
        }
        console.log(urlValueArr)
        for (let i = 0; i < urlValueArr.length; i++) {
            let labelURL = `https://www.fedex.com/shipping/labelAction.handle?method=doGetLabelFromCache&isDecompressRequired=false&utype=null&cacheKey=${urlValueArr[i]}`
            downloadImage(labelURL,`${order} FEDEX Label ${i+1}`)
        }
    }
    else{
        let image = document.getElementById("labelImage").src
        downloadImage(image, `${order} FEDEX`) 
    }    
}
async function downloadImage(imageSrc, name) {
    const image = await fetch(imageSrc)
    const imageBlog = await image.blob()
    const imageURL = URL.createObjectURL(imageBlog)
    const link = document.createElement('a')
    link.href = imageURL
    link.download = name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }