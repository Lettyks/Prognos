let data;

fetch("http://api.weatherapi.com/v1/forecast.json?key=f030cb6a5047432399f111440250106&q=London&days=14&aqi=no&alerts=no")
.then (res => res.json ())
.then (d => {
    data = d
    console.log(data)
    document.querySelector(".city").innerHTML = data.location.name
    document.querySelector(".temp").innerHTML = data.current.temp_c
    document.querySelector(".wind").innerHTML = data.current.wind_kph
    document.querySelector(".uv").innerHTML = data.current.uv
    document.querySelector(".humid").innerHTML = data.current.humidity
    document.querySelector(".precip").innerHTML = data.current.precip_mm
}) 