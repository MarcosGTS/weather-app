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
    console.log(weather);
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
