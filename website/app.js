
dynamicKey='8ffd8f4dfc1d3e500ba97f1122617431';
const link="https://api.openweathermap.org/data/2.5/weather?zip=";
const keypart= ",us&appid=";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
let fetchedData={};
async function GetData(link,userinput,keypart) {
    return new Promise(async function(resolve, reject) {
        const url = link+userinput+keypart+dynamicKey;
        const response = await fetch (url, {
            method: 'GET', 
             });
             if(response){
                resolve(response);
            }
            reject("failed to get data");
        });
}
//send post request to server
async function sendData(value) {
    try {
        let temperature = await value.json();
        const dataToSend = {
            temp: temperature.main.temp,
            date: newDate,
            userinput: document.getElementById('feelings').value
        };            
        
          await fetch('http://127.0.0.1:3000/addData', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend), 
        });
       return dataToSend;
    } catch (error) {
        console.error("Error:", error); 
    }
}

//update ui function
async function UpdateUi(dataObject){
    let tempEl=document.getElementById('temp');
    let dateEl=document.getElementById('date');
    let contentEl=document.getElementById('content');
    tempEl.textContent= `the tempreture is ${dataObject.temp}`;
    dateEl.textContent= `the date is ${dataObject.date}`;
    contentEl.textContent= `the note is ${dataObject.userinput}`;
}
//adding click event listener to start the chain
document.getElementById('generate').addEventListener('click',()=>{
    let userinput = document.getElementById('zip').value;
    GetData(link,userinput,keypart).then(async (data)=>{
        let res = await sendData(data);
        return res;
    }).then((dataObj)=>{
        UpdateUi(dataObj);
    });
})