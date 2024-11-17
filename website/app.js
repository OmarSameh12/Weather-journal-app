
dynamicKey='8ffd8f4dfc1d3e500ba97f1122617431';
const link="https://api.openweathermap.org/data/2.5/weather?zip=";
const keypart= ",us&appid=";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

async function GetData(link,userinput,keypart) {
    let dataToSend;
    new Promise(async function(resolve, reject) {
        const url = link+userinput+keypart+dynamicKey;
        console.log(url);
        const response = await fetch (url, {
            method: 'GET', 
             });
             if(response){
                resolve(response);
            }
            reject("failed to get data");
    
        }).then(async (value)=>{
            let temprature = await value.json();
            dataToSend = {
                temp: temprature.main.temp,
                date:newDate,
                userinput:document.getElementById('feelings').value
             }            
            console.log("the object to be sent is -> ",dataToSend);
            let response = await fetch('/http://127.0.0.1:3000/addData', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json', // Add this header
                },
                body: JSON.stringify(dataToSend), // Convert dataToSend to JSON string
            });
            
            if(response){
                resolve(response);
            }
            reject("failed to send post request")
        });
}
document.getElementById('generate').addEventListener('click',()=>{
    let userinput = document.getElementById('zip').value;
    GetData(link,userinput,keypart);
})