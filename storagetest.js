
if(localStorage.getItem("downloadStr") === null){
    localStorage.setItem("downloadStr",down)
}
else{
    let previousload = localStorage.getItem("LoadOrder")
    let currentload = String(Number(previousload) + 1)
    localStorage.setItem("LoadOrder",currentload)
}

console.log(localStorage.getItem("LoadOrder"))

