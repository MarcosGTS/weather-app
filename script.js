const weatherInfo = document.querySelector("#weather-info");
const searchBar = document.querySelector("#search-bar");
const searchBtn = document.querySelector("#search-btn");

const KEY = "d4d30e11a2f14dad9f4211444233007"
const API = "http://api.weatherapi.com/v1/forecast.json"

async function getWeatherData(search) {
    try {
        const apiUrl = getApiUrl(search);
        const response = await fetch(apiUrl, { mode: "cors" });
        const weatherData = await response.json();
        
        renderPage(weatherData);
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

function renderPage(weather) {
    const page = getWeatherPage(weather);    

    weatherInfo.innerHTML = page;
}

function getWeatherPage(weather) {
    console.log(weather);

    const { temp_c, temp_f, humidity, 
            wind_kph, wind_mph, cloud, last_updated } = weather.current;

    const { icon, text } = weather.current.condition;

    return `
    <div>
        <div>
            <img src="http:${icon}"/>
            <h3>${temp_c}</h3>
            <div>
                <p>${wind_kph}</p>
                <p>${humidity}</p>
                <p>${cloud}</p>
            </div>
        </div>
        <div>
            <p>${last_updated}</p>
            <p>${text}</p>
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
