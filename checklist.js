let totalMan = Number(document.querySelector("body > table.manifest-grid").rows.length)
let itemCount = 0
for (let i = totalMan; i > 1 ; i--){
    let status = document.querySelector(`body > table.manifest-grid > tbody > tr:nth-child(${i}) > td:nth-child(3) > div:nth-child(1) > span.box-size-9.i-inline-block > select`).value
    // console.log(status)
    if(status == 0 ){
        let url = document.querySelector(`body > table.manifest-grid > tbody > tr:nth-child(${i}) > td:nth-child(1) > a`).href
        window.open(url)

    }
    else{
        continue
    }
   
}
if(document.querySelector("#num_bol_needed").value != null){
    document.querySelector("#num_bol_needed").value = 1
}
Element