let create = document.getElementById('msp.profile')
let label = document.getElementById('label.trackingNumber')
if(create != null){
    let rawOrder = window.prompt("Enter Fedex String")
    let values = rawOrder.split(";")
    console.log(values)
    let name = values[0]
    let address = values[1]
    let zip = values[2]
    let city = values[3]
    let state = values[4]
    let phone = values[5]
    let order = values[6]
    let weight = values[7]
    let length = values[8]
    let width = values[9]
    let height = values[10]
    document.getElementById('hlnone').click()
    document.getElementById('toData.addressLine1').value = address
    document.getElementById('toData.zipPostalCode').value = zip
    document.getElementById('toData.city').value = city
    document.getElementById('toData.stateProvinceCode').value = state
    document.getElementById('toData.phoneNumber').value = phone
    document.getElementById('billingData.yourReference').value = order 
    document.getElementById('toData.residential').click()
    document.getElementById('module.pickupDropoff._expanded').style = "display: block"
    document.getElementById('pdm.initialChoice.useScheduledPickup').click()
    document.getElementById('psd.mps.row.weight.0').value = weight
    document.getElementById('psd.mps.row.dimensions.0').value = "manual"
    document.getElementById('psd.mps.row.dimensionLength.0').value = length
    document.getElementById('psd.mps.row.dimensionWidth.0').value = width
    document.getElementById('psd.mps.row.dimensionHeight.0').value = height
    setTimeout(function(){document.getElementById('rating.calculateRate').click()}, 1000);
    setTimeout(function(){document.getElementById('completeShip.ship.field').click()}, 3000);
}
else if(create === null && label === null){
    document.getElementById('completeShip.ship.field').click()
}
let addy = document.querySelector("#sales_order_view_tabs_order_info_content > section.admin__page-section.order-addresses > div.admin__page-section-content > div.admin__page-section-item.order-shipping-address > address").innerText
let addyArr = addy.split("\n")
console.log(addyArr)
class Order{
    constructor(Name,Street,City,State,Zip,ID){
        this.Name = Name
        this.Street = Street
        this.City = City
    }
}

