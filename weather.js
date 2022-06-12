const container = document.querySelector(".container"),
    inputtext = document.querySelector(".inputtext"),
    inputField = inputtext.querySelector("input"),
    weatherPart = container.querySelector(".weather"),
    apiKey = '4b994462e63e362d46da3945d2f55ab0';

let api;

inputField.addEventListener("keypress", e => {
    if (e.key == "Enter" && inputField.value != "") {
        fetchApi(inputField.value);
    }else{
        resetFields();
    }
});

function fetchApi(city) {
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    fetchData();
}

function fetchData() {
    fetch(api)
    .then(res => res.json())
    .then(result => getWeatherDetails(result))
    .catch(error => showError(error));
}

function getWeatherDetails(info) {
    const city = info.name;
    const country = info.sys.country;
    const { main } = info.weather[0];
    const { temp_min, temp_max } = info.main;
    const date = buildDate();
    weatherPart.querySelector("#date").innerText = date;
    weatherPart.querySelector(".temp").innerText = `Min ${temp_min}°C | Max ${temp_max}°C`;
    weatherPart.querySelector(".weatherdesc").innerText = main;
    weatherPart.querySelector(".location").innerText = `${city}, ${country}`;
}

function buildDate(){
    const currentDate = new Date();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return `${currentDate.getHours()}:${currentDate.getMinutes()} ${days[currentDate.getDay()]}, ${currentDate.getDate()} ${months[currentDate.getMonth()]} ${currentDate.getFullYear() } `;
}

function showError(error){
    console.log(error);
    inputtext.querySelector(".error").innerText = "Error fetching the data";
    resetFields();
}

function resetFields(){
    weatherPart.querySelector("#date").innerText = '';
    weatherPart.querySelector(".temp").innerText = '';
    weatherPart.querySelector(".weatherdesc").innerText = '';
    weatherPart.querySelector(".location").innerText = '';
}