let create = document.getElementById('msp.profile')
let label = document.getElementById('label.trackingNumber')
function copyToClipboardBase(text) {
    let input = document.createElement('input');
    input.setAttribute('value', text);
    document.body.appendChild(input);
    input.select();
    let result = document.execCommand('copy');
    document.body.removeChild(input);
    return result;
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
function getquote () {
    const el = document.getElementById('FEDEX_HOME_DELIVERY_A')
    if (el.innerText != null) {
      return el.innerText
    } else {
      setTimeout(getquote, 300); // try again in 300 milliseconds
    }
  }
if(create != null){
    let rawOrder = window.prompt("Enter Fedex String")
    let values = rawOrder.split("‰")
    console.log(values)
    let name = values[0]
    let fulladdress = String(values[1]).split("{")
    let address1 = fulladdress[0]
    let address2
    if (fulladdress[1] === undefined) {
        address2 = ""
    }
    else{address2 = fulladdress[1]}
    let zip = values[2]
    let city = values[3]
    let state = values[4]
    let phone = values[5]
    let order = values[6]
    let numItems = Number(values[7])
    document.getElementById('toData.contactName').value = name
    document.getElementById('toData.addressLine1').value = address1
    document.getElementById('toData.addressLine2').value = address2
    document.getElementById('toData.zipPostalCode').value = zip
    document.getElementById('toData.city').value = city
    document.getElementById('toData.stateProvinceCode').value = state
    document.getElementById('toData.phoneNumber').value = phone
    document.getElementById('billingData.yourReference').value = order 
    document.getElementById('toData.residential').click()
    document.getElementById('module.pickupDropoff._expanded').style = "display: block"
    document.getElementById('pdm.initialChoice.useScheduledPickup').click()
    document.getElementById('psdData.numberOfPackages').value = numItems 
    if(numItems === 1){
        let item = values[8].split(":")
        let weight = item[1]
        let length = item[2]
        let width = item[3]
        let height = item[4]
        document.getElementById('psd.mps.row.weight.0').value = weight
        document.getElementById('psd.mps.row.dimensions.0').value = "manual"
        document.getElementById('psd.mps.row.dimensionLength.0').value = length
        document.getElementById('psd.mps.row.dimensionWidth.0').value = width
        document.getElementById('psd.mps.row.dimensionHeight.0').value = height
    }
    else{
        for(let i = 0; i < numItems ; i++){
            let x = i+8
            let y = i+1
            let item = values[x].split(":")
            if(numItems === Number(item[0])){
                document.getElementById('psdData.arePackagesIdentical.Yes').click()
                let weight = item[1]
                let length = item[2]
                let width = item[3]
                let height = item[4]
                let DV = item[5]
                document.getElementById('psd.mps.row.weight.0').value = weight
                document.getElementById('psd.mps.row.dimensions.0').value = "manual"
                document.getElementById('psd.mps.row.dimensionLength.0').value = length
                document.getElementById('psd.mps.row.dimensionWidth.0').value = width
                document.getElementById('psd.mps.row.dimensionHeight.0').value = height
                document.getElementById(`psd.mps.row.declaredValue.0}`).value = DV
                break
            }
            else if(i === 0){
                document.getElementById('psdData.arePackagesIdentical.No').click()
                let quantity = item[0]
                let weight = item[1]
                let length = item[2]
                let width = item[3]
                let height = item[4]
                let DV = item[5]
                document.getElementById('psd.mps.row.qty.1').value = quantity
                document.getElementById('psd.mps.row.weight.1').value = weight
                document.getElementById('psd.mps.row.dimensions.1').value = "manual"
                document.getElementById('psd.mpsTable.dimensions.dropdown.1').style = "display: none"
                document.getElementById('psd.mpsTable.dimensions.manual.1').style = "display: block"
                document.getElementById('psd.mps.row.dimensionLength.1').value = length
                document.getElementById('psd.mps.row.dimensionWidth.1').value = width
                document.getElementById('psd.mps.row.dimensionHeight.1').value = height
                document.getElementById('psd.mps.row.declaredValue.1').value = DV
            }
            else{
                document.getElementById('psdData.arePackagesIdentical.No').click()
                let quantity = item[0]
                let weight = item[1]
                let length = item[2]
                let width = item[3]
                let height = item[4]
                let DV = item[5]
                document.getElementById(`psd.mps.row.qty.${y}`).value = quantity
                document.getElementById(`psd.mps.row.weight.${y}`).value = weight
                document.getElementById(`psd.mps.row.dimensions.${y}`).value= "manual"
                document.getElementById(`psd.mpsTable.dimensions.dropdown.${y}`).style = "display: none"
                document.getElementById(`psd.mpsTable.dimensions.manual.${y}`).style = "display: block"
                document.getElementById(`psd.mps.row.dimensionLength.${y}`).value = length
                document.getElementById(`psd.mps.row.dimensionWidth.${y}`).value = width
                document.getElementById(`psd.mps.row.dimensionHeight.${y}`).value = height
                document.getElementById(`psd.mps.row.declaredValue.${y}`).value =  DV
                
            }
        }
    }
    setTimeout(function(){document.getElementById('rating.calculateRate').click()}, 1000);
    setTimeout(function(){
        let quote = document.getElementById('FEDEX_HOME_DELIVERY_A').innerText;
        alert(quote)
        document.getElementById('completeShip.ship.field').click()
        }, 4000);
    


}
else if (label != null) {
    let rawOrder = window.prompt("Enter Fedex String")
    let values = rawOrder.split("‰")
    let order = values[6]
    if (document.querySelector("#labelData\\.labelPagination") != null){
        let options = document.querySelector("#labelData\\.labelPagination").children
        let valueArr = []
        let urlValueArr = []
        for (let i = 0; i < options.length; i++) {
            valueArr.push(options[i].value)
        }
        for (let i = 0; i < valueArr.length; i++) {
            let item = String(valueArr[i]).split(",")
            urlValueArr.push(item[1])
        }
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
else if(create === null && label === null){
    document.getElementById('completeShip.ship.field').click()
}
