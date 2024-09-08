const form = document.querySelector('.weather-form');
const card = document.querySelector('.card');


function updateUI (weatherInfos){
    
    card.style.display = 'block';
    let html = `
    <img src = "${weatherInfos.cityImage}" class="card-img-top" alt="Image Not Found">
    <p class="text-secondary fs-3" name = "city" >${weatherInfos.cityName}</p>
    <p class="text-secondary fs-5" name = "weather">${weatherInfos.weather}</p>
    <p class="text-secondary fs-1"> 
        <span name = "temperature in f">${weatherInfos.averageTemperature}</span>
        <span> °F </span>
        <span> / </span>
        <span name = "temperature in c">${fahrenheitToCelsius(weatherInfos.averageTemperature)}</span>
        <span> °C </span>
    </p>`
    card.innerHTML = html; 
}

async function updateWeatherInfos(cityName){
    let cityInfos = await findCity(cityName);
     
    let cityImageURL = await findImage(cityName);
    console.log(cityImageURL);
    let weatherInfos = await findWeather(cityInfos.Key);
    return {
            cityName: cityInfos.EnglishName,
            cityImage: cityImageURL,
            weather: weatherInfos.Day.IconPhrase,
            averageTemperature: (weatherInfos.Temperature.Maximum.Value + weatherInfos.Temperature.Minimum.Value)*0.5 };           
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    let cityName = form.city.value;
    
    updateWeatherInfos(cityName).then (weatherUI => updateUI(weatherUI))
    .catch(error => {
        console.log(error);
        card.style.display = 'none';
    }
    );
})

