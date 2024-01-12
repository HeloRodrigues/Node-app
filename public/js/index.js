const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const message1 = document.querySelector("#message-1");
const message2 = document.querySelector("#message-2");

message1.textContent = "";
message2.textContent = "";

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;

  message1.textContent = "Loading...";

  fetch(`http://localhost:3000/weather?address=${location}`).then((res) => {
    message1.textContent = "";
    res.json().then((forecastData) => {
      if (forecastData.error) {
        message2.textContent = forecastData.error;
      } else {
        message1.textContent = forecastData.location;

        message2.textContent = `It is currently ${
          forecastData.forecast.temperature
        }${"°C"} in ${forecastData.forecast.name}. It feels like ${
          forecastData.forecast.feelslike
        } ${"°C"}. It is ${forecastData.forecast.weather_descriptions}.`;
      }
    });
  });
});
