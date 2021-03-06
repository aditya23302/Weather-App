const api={
    key: "0efd16adb7bf3ddcc4f563cda194a41c",
}

const searchbox=document.querySelector('.search-box');
searchbox.addEventListener('keypress',setQuery);

function setQuery(evt)
{
    if(evt.keyCode==13)
    {
        console.log("SONU");
        getResults(searchbox.value);
    }
}

function getResults(query){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${api.key}`)
    .then(weather=>{
        return weather.json();
    })
    .then(displayResults);
}

function displayResults(weather)
{
    console.log(weather);
    let city=document.querySelector('.location .city');
    city.innerText=`${weather.name},${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);
  
    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)-273}<span>°c</span>`;
  
    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;
  
    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)-273}°c / ${Math.round(weather.main.temp_max)-273}°c`;


}

function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
  
    return `${day} ${date} ${month} ${year}`;
  }