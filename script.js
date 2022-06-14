let appID = 'f0247519a61647832a8b24d6d2c38723';
let units = 'metric';
let language = 'pt_br';

function searchCity (searchTerm) {
    if (isNaN (searchTerm) ) {
        fetch (`https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=${appID}&units=${units}&lang=${language}`)
        .then (response => {
            if (response.ok) {
                return response.json() }
            alert('Ocorreu um erro interno. Por favor, verifique a cidade informada.')})
        .then (response => { displayWeatherInfo(response) });
    return
    } 
    alert ('Erro: Informe uma cidade válida.')
}

function handleSubmit (event){
    event.preventDefault();
    let searchTerm = document.getElementById('searchInput').value;
    if (searchTerm && searchTerm != '') {
        searchCity(searchTerm)
}}

function displayWeatherInfo (responseFromServer){
    console.log (responseFromServer);
    switch (responseFromServer.weather[0].main) {
        case 'Clear':
            document.body.style.backgroundImage = 'url("images/clear_sky.jpg")';
            break;
        
        case 'Clouds':
            document.body.style.backgroundImage = 'url("images/cloudy.jpg")';
            break;
        
        case 'Rain':
        case 'Drizzle':
        case 'Mist':
            document.body.style.backgroundImage = 'url("images/rain.jpg")';
            break;

        case 'Thunderstorm':
            document.body.style.backgroundImage = 'url("images/storm.jpg")';
            break;
        
        case 'Snow':
            document.body.style.backgroundImage = 'url("images/snow.jpg")';
            break

        default:
            break;
    }

    var cityHeader = document.getElementById('cityHeader');
    var temperature = document.getElementById('temperature');
    var weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
    var weatherIcon = document.getElementById('weatherIcon');
    var windSpeed = document.getElementById('windSpeed');
    var humidity = document.getElementById('humidity');
    var resultDescription = responseFromServer.weather[0].description;
    
    cityHeader.innerHTML = responseFromServer.name;
    temperature.innerHTML = Math.floor(responseFromServer.main.temp)+` &#176C`;
    weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);
    weatherIcon.src = `http://openweathermap.org/img/wn/${responseFromServer.weather[0].icon}.png`;
    windSpeed.innerHTML = 'A velocidade do vento é de: ' + Math.floor(responseFromServer.wind.speed)+ ' m/s.';
    humidity.innerHTML ='A umidade relativa é de: ' + (responseFromServer.main.humidity) + '%.';
}