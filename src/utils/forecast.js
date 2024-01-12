import request from "request";

const forecast = (lat, lon, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=510e35ec5a00c34409447f1c2bb6990e&query=${lat},${lon}`;

  request({ url, json: true }, (error, { body }) => {
    const forecastData = {
      name: body.location.name,
      temperature: body.current.temperature,
      feelslike: body.current.feelslike,
      weather_descriptions: body.current.weather_descriptions[0],
    };

    if (error) {
      callback("Unable to connect to web service!");
    } else if (body.error) {
      callback("Unable to get forecast!");
    } else {
      callback(undefined, forecastData);
    }
  });
};

export default forecast;
