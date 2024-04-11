let input = document.getElementById("city-name");
let btn = document.getElementById("btn");
let row = document.getElementById("row");

input.addEventListener("keypress", e => {
    if (e.key === "Enter" && input.value !== "") {
        getWeather(input.value);
        console.log(input.value);
        e.preventDefault();
    }
});

btn.addEventListener("click", () => {
    getWeather(input.value);
});

async function getWeather(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=baae8599059bee380d5ccf23de1905b4&units=metric`);
    const data = await response.json();
    createCard(data);
};

function turkishWeather(description) {
    switch (description) {
        case "clear sky":
            return "Açık Gökyüzü";
        case "few clouds":
            return "Az Bulutlu"; 
        case "scattered clouds":
            return "Parçalı Bulutlu"; 
        case "overcast clouds":
            return "kapalı";    
        case "broken clouds":
            return "Kısmen Bulutlu"; 
        case "shower rain":
            return "Sağanak Yağış"; 
        case "rain":
            return "Yağmurlu"; 
        case "thunderstorm":
            return "Gök gürültülü fırtına"; 
        case "snow":
            return "Karlı"
        case "mist":
            return "Sisli";
        default:
            return description;
    }
}

function createCard(weather) {
    let row = document.getElementById("row");
     let durum = turkishWeather(weather.weather[0].description);
     let icon = durum.includes("bulutlu") ? `<i class="bi bi-cloudy-fill"></i>` :
                durum.includes("yağmurlu") ? `<i class="bi bi-cloud-drizzle"></i>` :
                durum.includes("parçalı bulutlu") ? `<i class="bi bi-clouds"></i>` :
                durum.includes("kısmen bulutlu") ? `<i class="bi bi-clouds-fill"></i>` :
                durum.includes("sağanak yağış") ? `<i class="bi bi-cloud-rain-fill"></i>` :
                durum.includes("gök gürültülü fırtına") ? `<i class="bi bi-cloud-lightning-rain-fill"></i>` :
                durum.includes("karlı") ? `<i class="bi bi-thermometer-snow"></i>` :
                durum.includes("sisli") ? `<i class="bi bi-cloud-fog2-fill"></i>` : '';


    row.innerHTML = `
        <h3>${weather.name.split(" ")[0]} anlık hava durumu şu şekildedir;</h3>        
        <h6>Hava Durumu: ${turkishWeather(weather.weather[0].description)}</h6>
        <div class="main">
        <div class="wind-humidity">
            <li>Nem: ${weather.main.humidity}</li>
            <li>Rüzgar Hızı: ${Math.floor(weather.wind.speed)}</li>
            <li>Rüzgar Açısı: ${weather.wind.deg}</li>
        </div>
    
    
        <div class"heat">
            <li>Ana Sıcaklık: ${Math.floor(weather.main.temp)}</li>
            <li>Hissedilen: ${Math.floor(weather.main.feels_like)}</li>
            <li>Maximum Sıcaklık: ${Math.floor(weather.main.temp_max)}</li>
            <li> Minimum Sıcaklık: ${Math.floor(weather.main.temp_min)}</li>
        </div>
        </div>
    `;

    row.style.color = "blue";
    row.style.display = "flex";
    row.style.flexDirection = "column";
    row.style.alignItems = "center";
    
    const main = document.querySelector(".main");
    main.style.display = "flex";
    main.style.width = "500px"
    main.style.justifyContent = "space-between";
    main.style.border = "1px solid #3d719c";
    main.style.borderRadius = "10px";
    main.style.background = "transparent";
    main.style.backdropFilter = "blur(1px)";
    main.style.padding = "20px";
};

document.addEventListener("DOMContentLoaded", function (){
    let texts = document.querySelectorAll("h1");
    let animationDelay = 0.2;

    texts.forEach(function (text, index){
        text.style.animationDelay = index * animationDelay +"s";
    });
});

