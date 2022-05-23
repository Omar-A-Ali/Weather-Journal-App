/* Global Variables */
const apiKey = "&APPID=3007e0ced1d3f55eba1e06bbf259a942&units=imperial"; //openweather API key
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip="; //openwather base URL


//function to convert fahrenheit  to celsius .... i could've used the metric system identification on calling api apiKey+'unit=metric'
function fehrToCel(temp){
    let celsius = ( temp - 32) * (5/9);
    return celsius.toFixed(2);
}

const getDataFromApi = async (zipCode)=>{
    const res = await fetch(baseURL + zipCode + apiKey);
    const data = await res.json();
    const temp = data.main.temp;
    return temp;
}

const toServer = async (temp, feelings, newDate)=>{
    await fetch('/saveData',{
        method: 'POST',
        headers: {'content-Type': 'application/json'},
        body: JSON.stringify({temp,feelings,newDate}),
    });
}

const fromServer = async ()=>{
    const res = await fetch('/getData');
    const data = await res.json();
    return data; //{temp,feelings,newDate}
}

const updateWeb = async ({temp,feelings,newDate})=>{
    const celsius = fehrToCel(temp);
    document.getElementById('error').innerHTML = "";
    document.getElementById('temp').innerHTML = `Temperature:  ${temp}°F / ${celsius}°C`;
    document.getElementById('date').innerHTML = `Date: ${newDate}`;
    document.getElementById('content').innerHTML = feelings;
}

const generate = async ()=>{
    try {
        //getting the zip code and feelings
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    // Create a new date instance dynamically with JS
    let d = new Date();
    //getMonth return the month - 1 so it is logical to add 1
    let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

    //get temp from openweather api
    const temp = await getDataFromApi(zipCode);

    //sending temp, feelings and date to local backend
    await toServer(temp, feelings, newDate);


    //get data from local backend
    const data = await fromServer();


    //update UI
    updateWeb(data);
    } catch (error) {
        document.getElementById('error').innerHTML = "Please enter a valid zip-code or feelings";
        console.log(error);
    }
    
}


document.getElementById('generate').addEventListener('click',generate);