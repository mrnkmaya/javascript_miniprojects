async function getCurrentWeatherByCity(city){
    const data = await fetch(`http://api.weatherapi.com/v1/current.json?key=d6e8db79d4214db7b3b132302241912&q=${city}&aqi=no`)
    const currentWeather = await data.json()
    console.log(currentWeather);
    return currentWeather
}

const locationInput = document.querySelector('.location-input');
const locationBtn = document.querySelector('.location-btn');

locationBtn.addEventListener('click', async () => {
    const valueInput = locationInput.value
    const currentWeather = await getCurrentWeatherByCity(valueInput)
    const forecast = await getForecastByCity(valueInput)

    const currentWeatherIcon = `http:${currentWeather.current.condition.icon}`
    const currentWeatherTemperature = currentWeather.current.temp_c
    const currentWeatherStatus = currentWeather.current.condition.text
    resetWeather()
    renderCurrentWeather(currentWeatherIcon, currentWeatherTemperature, currentWeatherStatus)
    
    renderForecast(forecast.forecast.forecastday[0].hour)
});

function renderCurrentWeather(iconSrc, temperature, status) {
    const currentWeatherIconEl = document.createElement('img');
    currentWeatherIconEl.setAttribute('class', 'current-weather-icon')
    currentWeatherIconEl.setAttribute('src', iconSrc)

    const currentWeatherTemperatureEl = document.createElement('p');
    currentWeatherTemperatureEl.setAttribute('class', 'current-weather-temperature')
    currentWeatherTemperatureEl.innerHTML = temperature

    const currentWeatherStatusEl = document.createElement('p');
    currentWeatherStatusEl.setAttribute('class', 'current-weather-status')
    currentWeatherStatusEl.innerHTML = status

    const currentWeather = document.querySelector('.current-weather');
    currentWeather.appendChild(currentWeatherIconEl)
    currentWeather.appendChild(currentWeatherTemperatureEl)
    currentWeather.appendChild(currentWeatherStatusEl)
}


async function getForecastByCity(city){
    const data = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=d6e8db79d4214db7b3b132302241912&q=${city}&days=1&aqi=no&alerts=no`)
    const forecast = await data.json()
    console.log(forecast);
    return forecast
}

function createForecast(iconSrc, time, temperature) {
    const forecastElement = document.createElement('div');
    forecastElement.setAttribute('class', 'forecast-element')

    const forecastTime = document.createElement('p');
    forecastTime.setAttribute('class', 'forecast-tme')
    forecastTime.innerHTML = time.slice(11)

    const forecastIcon = document.createElement('img');
    forecastIcon.setAttribute('class', 'forecast-icon')
    forecastIcon.setAttribute('src', `http:${iconSrc}`)

    const forecastTemperature = document.createElement('p');
    forecastTemperature.setAttribute('class', 'forecast-temperature')
    forecastTemperature.innerHTML = temperature

    forecastElement.appendChild(forecastTime)
    forecastElement.appendChild(forecastIcon)
    forecastElement.appendChild(forecastTemperature)

    return forecastElement
}

// const forecast
function renderForecast(forecast) {
    const forecastContainer = document.querySelector('.forecast');

    forecast.forEach(forecastItem => {
        const forecastEl = createForecast(forecastItem.condition.icon, forecastItem.time, forecastItem.temp_c)
        forecastContainer.appendChild(forecastEl)
    });
}

function resetWeather() {
    const currentWeather = document.querySelector('.current-weather');
    currentWeather.innerHTML = ''
    const forecastContainer = document.querySelector('.forecast');
    forecastContainer.innerHTML = ''

}