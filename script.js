let data;

function getWeather(city) {
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=f030cb6a5047432399f111440250106&q=${city}&days=14&aqi=no&alerts=no`)
        .then(res => res.json())
        .then(d => {
            console.log(d)
            data = d
            if(data.current.condition.code > 1180 && data.current.condition.code < 1201){
                document.body.style.backgroundImage = "url(https://static.wixstatic.com/media/5acbb4_68aecc720ed54b5a89edf655cb6f9f6e~mv2.gif)"
            }
            if(data.current.condition.code > 1210 && data.current.condition.code < 1225){
                document.body.style.backgroundImage = "url(https://sanjuanheadwaters.org/wp-content/uploads/2023/02/snow-falling-gif.gif)"
            }
            if(data.current.condition.code > 1000){
                document.body.style.backgroundImage = "url(https://i.pinimg.com/originals/51/29/98/512998939eb4d7097d95feaf8d1cf5f4.gif)"
            }
            if(data.current.condition.code > 1003 && data.current.condition.code < 1030){
                document.body.style.backgroundImage = '"url(https://cdnimpuls.com/voxnews.al/media3/-640-0-giphy-1678084417.gif)"'
            }
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

document.querySelector(`#search`).addEventListener("input", (e)=> {
    console.log(e.target.value)
    fetch(`http://api.weatherapi.com/v1/search.json?key=f030cb6a5047432399f111440250106&q=${e.target.value}`).then(res => res.json()).then(data =>{
        document.querySelector("#searching").innerHTML = data.map(c=>`<option value="${c.name}">${c.name}</option>`).join("")
    })
})

document.querySelector(".but").addEventListener("click", function (){
    let city = document.querySelector(`#search`).value
    getWeather(city)
})