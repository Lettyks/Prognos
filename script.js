let data;

fetch("http://api.weatherapi.com/v1/forecast.json?key=f030cb6a5047432399f111440250106&q=London&days=14&aqi=no&alerts=no")
.then (res => res.json ())
.then (d => {
    data = d
    console.log(data)
    document.querySelector(".city").innerHTML = data.location.name
    document.querySelector(".temp").innerHTML = "Температура: "+ data.current.temp_c + "℃"
    document.querySelector(".wind").innerHTML = "Швидкість вітру: "  + data.current.wind_kph + "км/год"
    document.querySelector(".uv").innerHTML = "УФ - індекс: " + data.current.uv 
    document.querySelector(".humid").innerHTML = "Вологість: "+ data.current.humidity + "%"
    document.querySelector(".precip").innerHTML = "Опади: " + data.current.precip_mm + "мм"

    data.forecast.forecastday.forEach(el=>{
        document.querySelector(".days").innerHTML += `
      <div class="day">
      <img src="${el.day.condition.icon}" alt="">
      <div class="maxt">Макс. ${el.day.maxtemp_c}</div>
      <div class="mint">Мін. ${el.day.mintemp_c}</div>
      <div class="mint">УФ - індекс ${el.day.uv}</div>
      <div class="mint">${el.day.daily_will_it_rain ? "Буде дощити": ""}</div>
      <div class="mint">${el.day.mintemp_c}</div>
      <div class="mint">${el.day.mintemp_c}</div>

    </div>
        `
    })
}) 