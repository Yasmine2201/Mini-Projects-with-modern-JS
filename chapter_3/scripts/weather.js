myAPIKey = 'vzLj8AIrCYJ7tPwXCfGgjc0y7MNz1THu';
CityResourceURL = 'http://dataservice.accuweather.com/locations/v1/cities/search';
WeatherResourceURL = 'http://dataservice.accuweather.com/forecasts/v1/daily/1day/';

async function findCity (cityName) {
    let queryString = `?apikey=${myAPIKey}&q=${cityName}`;
    let response = await fetch(CityResourceURL + queryString);
    if (!response.ok) throw new Error ("Error while fetching the ressource.");     
    else {
        let data = await response.json();
        return data[0];
    } 
}
async function findWeather (cityCode) {
    let queryString = `?apikey=${myAPIKey}`;
    let response = await fetch(WeatherResourceURL+cityCode + queryString);
    if (!response.ok) throw new Error ("Error while fetching the ressource.");     
    else {
        let data = await response.json();
        return data.DailyForecasts[0] ;
    } 

}
function fahrenheitToCelsius(fahrenheit) {
    const celsius = (5/9) * (fahrenheit - 32);
    return celsius.toFixed(1);
}



