const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const message1 = document.querySelector("#message-1");
const message2 = document.querySelector("#message-2");

message1.textContent = "";
message2.textContent = "";

weatherForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const location = search.value;

  message1.textContent = "Loading...";

  try {
    const response = await fetch(`/weather?address=${location}`);

    if (!response.ok) {
      message1.textContent = "";
      throw new Error("Failed to fetch data!");
    }

    const forecastData = await response.json();

    if (forecastData.error) {
      message2.textContent = forecastData.error;
    } else {
      message1.textContent = forecastData.location;

      message2.textContent = message2.textContent = `It is currently ${
        forecastData.forecast.temperature
      }${"°C"} in ${forecastData.forecast.name}. It feels like ${
        forecastData.forecast.feelslike
      } ${"°C"}. It is ${forecastData.forecast.weather_descriptions}.`;
    }
  } catch (error) {
    message1.textContent = "";
    message2.textContent = "Failed to fetch data!";
  }
});
