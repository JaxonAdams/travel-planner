var flightListEl = document.querySelector("#text-form-id");
var buttonEl = document.getElementById("text-form-submit");
var unorderList = document.getElementById("available-flights");

buttonEl.addEventListener("click",function(event){
    event.preventDefault();
    var userInput = document.getElementById("text-form").value;
    var result = getAPIData(userInput);
    displayResults(result);


})

console.log(flightListEl);

//nothing is typed in text box 



function getAPIData(userInput){
    var results = [
        {
            name : "flight1",
            depart: "12:03",
            price: "180",

        },
        {
            name : "flight2",
            depart: "11:03",
            price: "130",

        },
        {
            name : "flight3",
            depart: "10:03",
            price: "150",

        },
    ]
    return results
}

function displayResults(result){
    
    for(let i = 0; i < result.length; i++){
        var listItem = document.createElement("li");
        listItem.textContent = result[i].name + " :  " + result[i].depart +"  :  "+ result[i].price;
        

        unorderList.appendChild(listItem);
    }
}
unorderList.addEventListener("click",listItem);

function listItem(event){
    console.log(event.target);
}