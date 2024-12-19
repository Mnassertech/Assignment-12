var search = document.getElementById("input");
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

async function weatherChecker(cityName) {
    if (!cityName) {
        return;
    }
    var apiData = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=93165a4c48e74bc48ad102617241512&q=${cityName}&days=3`);
    var data = await apiData.json();
    
    if (data.error) {
        console.error(data.error.message);
        return;
    }   
    document.querySelector(".location").innerHTML = data.location.name;
    document.querySelector(".temp").innerHTML = data.current.temp_c ;
    document.querySelector(".temp2m").innerHTML = data.forecast.forecastday[1].day.maxtemp_c ;
    document.querySelector(".temp2min").innerHTML = data.forecast.forecastday[1].day.mintemp_c + " °C";
    document.querySelector(".temp3m").innerHTML = data.forecast.forecastday[2].day.maxtemp_c;
    document.querySelector(".temp3min").innerHTML = data.forecast.forecastday[2].day.mintemp_c + " °C";
    document.querySelector(".custom").innerHTML = data.current.condition.text;
    document.querySelector(".custom2").innerHTML = data.forecast.forecastday[1].day.condition.text;
    document.querySelector(".custom3").innerHTML = data.forecast.forecastday[2].day.condition.text;
    document.querySelector(".forecast-icon1").innerHTML = `
        <img src="https:${data.current.condition.icon}" alt="" width="100">
    `;
    document.querySelector(".forecast-icon2").innerHTML = `
        <img src="https:${data.forecast.forecastday[1].day.condition.icon}" alt="" width="100">
    `;
    document.querySelector(".forecast-icon3").innerHTML = `
        <img src="https:${data.forecast.forecastday[2].day.condition.icon}" alt="" width="100">
    `;
    
    var lastUpdated = new Date(data.current.last_updated);
    displayTime(lastUpdated);
}

function displayTime(latestData) {
    document.querySelector(".day").innerHTML = latestData.getDate();
    var dayIndex = latestData.getDay();
    var monthIndex = latestData.getMonth();
    document.querySelector(".month").innerHTML = months[monthIndex];
    document.querySelector(".weekDay").innerHTML = days[dayIndex];
    document.querySelector(".tmrw").innerHTML = days[(dayIndex + 1) % 7];
    document.querySelector(".afterTmrw").innerHTML = days[(dayIndex + 2) % 7];
}

search.addEventListener("keyup", function() {
    var cityName = search.value;
    if (cityName) {
        weatherChecker(cityName);
    }
});
window.onload = function() {
    weatherChecker("Cairo");
};