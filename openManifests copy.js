   let totalMan = (Number(document.querySelector("body > table.manifest-grid").rows.length) + 1)
    let l = 1
    for (let i = 2; i < totalMan; i++){
        let status = document.querySelector(`body > table.manifest-grid > tbody > tr:nth-child(${i}) > td:nth-child(3) > div:nth-child(1) > span.box-size-9.i-inline-block > select`).value
        console.log(status)
        if(status == 0 || status == 8 ){
            continue
        }
        else{
            let url = document.querySelector(`body > table.manifest-grid > tbody > tr:nth-child(${i}) > td:nth-child(1) > a`).href
            window.open(url)
        }
    }