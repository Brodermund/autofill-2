let totalMan = (Number(document.querySelector("body > table.manifest-grid").rows.length) + 1)
localStorage.removeItem("DownloadStr")
localStorage.removeItem("StopStr")
localStorage.removeItem("LoadOrder")
let l = 1
for (let i = 2; i < totalMan; i++){
    let status = document.querySelector(`body > table.manifest-grid > tbody > tr:nth-child(${i}) > td:nth-child(3) > div:nth-child(1) > span.box-size-9.i-inline-block > select`).value
    // console.log(status)
    if(status == 8 || status == 0 ){
        let man = document.querySelector(`body > table.manifest-grid > tbody > tr:nth-child(${i}) > td:nth-child(1) > a`).innerText
        // console.log(`Skipped:${man}`)
        continue
    }
    else{
        let url = document.querySelector(`body > table.manifest-grid > tbody > tr:nth-child(${i}) > td:nth-child(1) > a`).href
        // localStorage.removeItem("totalManifests")
        // console.log(l)
        localStorage.setItem("totalManifests",`${l}`)
        l++
        window.open(url)
    }
   
}