let totalMan = (Number(document.querySelector("body > table").rows.length) + 1)
for (let i = 2; i < totalMan; i++){
    let status = document.querySelector(`body > table > tbody > tr:nth-child(${i}) > td:nth-child(3) > div:nth-child(1) > span.box-size-9.i-inline-block > select`).value
    if(status == 0){
        let url = document.querySelector(`body > table > tbody > tr:nth-child(${i}) > td:nth-child(1) > a`).href
        window.open(url)
    }
    else{continue}
}