buildPopups()
let previousMonthInline = document.getElementById('monthInputs')
previousMonthInline.addEventListener("click", function() {
        let elements = document.getElementsByClassName("day");
        console.log(elements.length)
        for (let i = 0; i < elements.length;i++) {
            let id = elements[i].id
            elements[i].addEventListener('click', function(){openDay(id)});
        }
})
previousMonthInline.addEventListener("change", function() {
        let elements = document.getElementsByClassName("day");
        console.log(elements.length)
        for (let i = 0; i < elements.length;i++) {
            let id = elements[i].id
            elements[i].addEventListener('click', function(){openDay(id)});
        }
})
let dateInput = document.getElementById('dateSelect')
dateInput.addEventListener("change", function() {buildPopups()})

function buildPopups(){
    let elements = document.getElementsByClassName("day");
    document.addEventListener("DOMContentLoaded", function(e) {// do stuff
    console.log(elements.length)
    for (let i = 0; i < elements.length;i++) {
        let id = elements[i].id
        elements[i].addEventListener('click', function(){openDay(id)});
    }
    })
}


function clearEvents(){
    let events = document.getElementById('eventWrapper')
    var tableHeaderRowCount = 1;
    var table = document.getElementById('eventWrapper');
    var rowCount = table.rows.length;
    for (var i = tableHeaderRowCount; i < rowCount; i++) {
        table.deleteRow(tableHeaderRowCount);
    }
}

function openDay(date){
    console.log(date)
    clearEvents()
    let div = document.getElementById("popupbox")
    div.style.display = "block"
    let formDate = getFormalDate(date)
    document.getElementById("PickedDate").innerHTML = formDate
    let todayEvents = getEventsForDate(date)
    console.log(todayEvents)
    AddEventsToPopup(todayEvents)
}
function ordinalSuffix(i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}

function getFormalDate(date){
    let constMonths = ["January","February","March","April","May","June","July","August","September","October","November","December"]
    let weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    let dateArr = date.split("-")
    let year = dateArr[0]
    let month = Number(dateArr[1])
    let day = Number(dateArr[2])
    let ordDay = ordinalSuffix(day)
    let d = new Date(year, month, day);
    let formalMonth = constMonths[month-1]
    let dayOfWeek = weekdays[d.getDay()]
    let finalString = `${dayOfWeek}, ${formalMonth} ${ordDay}, ${year}`
    return finalString

}
function AddEventsToPopup(arr){
    let wrapper = document.getElementById("eventTable")
    for (let i = 0; i < arr.length;i++) {
        let div = document.createElement("tr");
        div.classList.add("popupEvent");
        let eventName = document.createElement("td");
        eventName.innerHTML = `<a href = http://localhost:8080/view/${arr[i].id}>${arr[i].name}</a>`
        div.appendChild(eventName)
        let eventLocation = document.createElement("td");
        eventLocation.innerHTML = arr[i].location
        div.appendChild(eventLocation)
        let eventDescription = document.createElement("td");
        eventDescription.innerHTML = arr[i].description
        div.appendChild(eventDescription)
        let eventEdit = document.createElement("td");
        eventEdit.innerHTML = `<a href = http://localhost:8080/edit/${arr[i].id}>Edit</a>`
        div.appendChild(eventEdit)

        wrapper.appendChild(div);
    }

}

function getEventsForDate(date){
    let finalArr = []
    let eventsArr = [[${events}]]
    for( let i = 0; i < eventsArr.length;i++){
        if(eventsArr[i].startDate === date){
            finalArr.push(eventsArr[i])
        }
        else{continue}
    }
 return finalArr
}