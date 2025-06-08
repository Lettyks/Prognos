let data;

function getWeather(city) {
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=f030cb6a5047432399f111440250106&q=${city}&days=14&aqi=no&alerts=no`)
        .then(res => res.json())
        .then(d => {
            console.log(data)
            data = d
            document.querySelector(".city").innerHTML = data.location.name
            document.querySelector(".temp").innerHTML = "Температура: " + data.current.temp_c + "℃"
            document.querySelector(".wind").innerHTML = data.current.wind_kph + "км/год"
            document.querySelector(".uv").innerHTML = data.current.uv
            document.querySelector(".humid").innerHTML = data.current.humidity + "%"
            document.querySelector(".precip").innerHTML = data.current.precip_mm + "мм"
            document.querySelector(".days").innerHTML = ''

            data.forecast.forecastday.forEach(el => {
                document.querySelector(".days").innerHTML += `
      <div class="day">
      <img src="${el.day.condition.icon}" alt="">
      <div class="maxt">Макс. ${el.day.maxtemp_c} </div>
      <div class="mint">Мін. ${el.day.mintemp_c} ℃</div>
      <div class="uv">УФ - індекс ${el.day.uv}</div>
      <div class="dail_rain">${el.day.daily_will_it_rain ? "Буде дощити" : ""}</div>
      <div class="dail_snow">${el.day.daily_will_it_snow ? "Буде сніжити" : ""}</div>
      <div class="maxwin">Вітер ${el.day.maxwind_kph} км/год</div>

    </div>
        `
            })
        })
}

document.querySelector(`#searching`).addEventListener("change", (e) => {
    console.log(e.target.value)
    getWeather(e.target.value)
})

getWeather("Kyiv")