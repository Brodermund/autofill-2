let Carrier 
if (window.confirm("FragilePak?")) {Carrier = "FragilePak";}
    else{Carrier = "Odyssey";}  

if (Carrier === "FragilePak") {

    let numOrders= Number(window.prompt("Number of Orders?"))
    let nonACStr= window.prompt("Non-AC Pages?")
    let nonACArr = nonACStr.split(",")
    console.log(nonACArr)
    let totalPages = (numOrders * 2) - nonACArr.length
    let finalArr = getFPPages(nonACArr,totalPages)
    let final = finalArr.join(",")
    window.alert(final)
    Autofill('')
}
else if (Carrier === "Odyssey"){
    let numOrders= Number(window.prompt("Number of Orders?"))
    let nonACStr= window.prompt("Non-AC Pages?")
    let nonACArr = nonACStr.split(",")
    console.log(nonACArr)
    let totalPages = ((numOrders * 3) + 1) - nonACArr.length
    let finalArr = getOdysseyPages(nonACArr,totalPages)
    let final = finalArr.join(",")
    window.alert(final)
    Autofill('')


}

else{Autofill('')}

function getOdysseyPages(arr,total){
    let acOrder = false
    let bol = true
    let invoice = false
    let trash = false
    let finalArr = []
    for(let i = 2 ; i < total+1; i++){
        if(arr.includes(String(i))){
            finalArr.push(i)
            acOrder = true
        }else if(acOrder === true && !finalArr.includes(String(i))){
            finalArr.push(i)
            acOrder = false
        }
        else if(bol === true){
            finalArr.push(i)
            invoice = true
            bol = false
        }
        else if(invoice === true){
            finalArr.push(i)
            invoice = false
            trash = true
        }
        else if(trash === true){
            bol = true
            trash = false
            continue
        }
    }
    return finalArr


}
function getFPPages(arr,total){
    let baseformat = 1
    let finalArr = []
    for(let i = 0 ; i < total+1; i++){
        if(arr.includes(String(i))){
            finalArr.push(i)
            baseformat = baseformat + 1
            console.log(`${i}:${baseformat}`)
        }
        else{
            if(baseformat % 2 == 0){
                if(i % 2 == 0){
                    finalArr.push(i)
                    console.log(`${i}:${baseformat}`)
                }
                else{continue}
            }
            else{
                if(i % 2 == 0){
                    continue
                }
                else{
                    finalArr.push(i)
                    console.log(`${i}:${baseformat}`)
                }

            }
        }
    }
    return finalArr
}