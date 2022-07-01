let totalMan = Number(document.querySelector("body > table.manifest-grid").rows.length)
let itemCount = 0
for (let i = totalMan; i > 1 ; i--){
    let status = document.querySelector(`body > table.manifest-grid > tbody > tr:nth-child(${i}) > td:nth-child(3) > div:nth-child(1) > span.box-size-9.i-inline-block > select`).value
    // console.log(status)
    if(status == 0 ){
        let man = document.querySelector(`body > table.manifest-grid > tbody > tr:nth-child(${i}) > td:nth-child(1) > a`).innerText
        let pieces = getPieces(i)
        itemCount = itemCount + pieces
        console.log(itemCount)
        if(itemCount > 100){
            continue
        }
        else{
            document.querySelector(`#chkbox_${man}`).click()

        }
        
    }
    else{
        continue
    }
   
}

function getPieces(i){
    let str = document.querySelector(`body > table.manifest-grid > tbody > tr:nth-child(${i}) > td:nth-child(7) > span`).innerText
    let arr = str.split("/")
    let final = arr[1]
    return Number(final)
}