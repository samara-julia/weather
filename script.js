document.querySelector('#search').addEventListener('submit', async (event) => {
    event.preventDefault();

    const cityName = document.querySelector('#city-name').value;

    if (!cityName) {
        return showAlert("digite uma cidade primeiro...!")
    }

    const apiKey = '73c9c0e32bad3bae2876a1ab86f02ab4'
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`

    const results = await fetch(apiURL)
    const json = await results.json()

    if (json.cod === 200) {
        showInfos({
            city: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            tempmax: json.main.temp_max,
            tempmin: json.main.temp_min,
            description: json.weather[0].description,
            windSpeed: json.wind.speed,
            humidity: json.main.humidity,
        })
    } else {
        showAlert('não foi possível localizar... :(')
    }
})

function showInfos(json) {
    showAlert('')

    document.querySelector('#title').innerHTML = `${json.city}, ${json.country}`
    document.querySelector('#temp-value').innerHTML = `${json.temp.toFixed(0).toString()}<sup>°C</sup>`
    document.querySelector('#temp-description').innerHTML = `${json.description}`
    document.querySelector('#temp-max').innerHTML = `${json.tempmax.toFixed(0).toString()}<sup>°C</sup>`
    document.querySelector('#temp-min').innerHTML = `${json.tempmin.toFixed(0).toString()}<sup>°C</sup>`
    document.querySelector('#humidity').innerHTML = `${json.humidity}%`
    document.querySelector('#wind').innerHTML = `${json.windSpeed.toFixed(0)}km/h`

}

function showAlert(mensagem) {
    document.querySelector('#alert').innerHTML = mensagem;

}