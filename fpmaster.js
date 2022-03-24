let totalMan = document.querySelector("body > table").rows.length
localStorage.removeItem("DownloadStr")
localStorage.removeItem("StopStr")
localStorage.removeItem("LoadOrder")
for (let i = 2; i < totalMan; i++){
    let manifest = document.querySelector(`body > table > tbody > tr:nth-child(${i}) > td:nth-child(1) > a`).innerText
    console.log(manifest)
  
}
   Autofill('c58')