const weatherInfo = document.querySelector("#renderer");
const searchBar = document.querySelector("#search-bar");
const searchBtn = document.querySelector("#search-btn");

const KEY = "d4d30e11a2f14dad9f4211444233007"
const API = "https://api.weatherapi.com/v1/forecast.json"

async function getWeatherData(search) {
    try {
        // set Loading 
        renderPage(getLoadingPage());

        const apiUrl = getApiUrl(search);
        const response = await fetch(apiUrl, { mode: "cors" });
        const weatherData = await response.json();
        
        renderPage(getWeatherPage(weatherData));
    } catch(e) {
        console.log(e);
    }
}

function appendAttribute(url, attr, value) {
    if (url.includes("?")) {
        return `${url}&${attr}=${value}`;
    }

    return `${url}?${attr}=${value}`;
}

function getApiUrl(search) {
   let finalUrl = appendAttribute(API, "key", KEY);
   finalUrl = appendAttribute(finalUrl, "q", search);

   return finalUrl;
}

function renderPage(page) {
    weatherInfo.innerHTML = page;
}

function getLoadingPage() {
    return `<div class="loader"></div>`;
}

function getWeatherPage(weather) {
    console.log(weather);

    const { temp_c, temp_f, humidity, 
            wind_kph, wind_mph, cloud, last_updated } = weather.current;

    const { icon, text } = weather.current.condition;
    const { name, country } = weather.location; 

    return `
    <div class="weather-info blue">
        <div class="localization">
            <p>${name}, ${country}</p>
            <p>${last_updated}</p>
        </div>
        <div class="responsive">
            <div class="temperature-main">
                <div class="temperature-container">
                    <span><img src="http:${icon}"/></span>
                    <h3 class="temp">${temp_c}&deg;c</h3>
                </div>
                <p>${text}</p>
            </div>
            <div class="more-info">
                <span class="info">
                    <h3>Wind</h3>
                    <p>${wind_kph}</p>
                </span>
                <span class="info">
                    <h3>Humidity</h3>
                    <p>${humidity}</p>
                </span>
                <span class="info">
                    <h3>Cloud</h3>
                    <p>${cloud}</p>
                </span>
            </div>
        </div>
    </div>
    `;
}

function searchWeather() {
    const search = searchBar.value;
    getWeatherData(search);
}

function setupEvents() {
    // TO-DO: suggentions to search
    searchBtn.addEventListener("click", searchWeather); 
}

setupEvents();
getWeatherData("Sao Luis");
