import request from "request";
import "dotenv/config";

const access_token = process.env.ACCESS_TOKEN;

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${access_token}&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    console.log({
      body,
    });
    const locationLatAndLon = {
      latitude: body.features[0].center[1],
      longitude: body.features[0].center[0],
      location: body.features[0].place_name,
    };

    if (error) {
      callback("Unable to connect to location services");
    } else if (body.features.length === 0) {
      console.log("unable to find location");
    } else {
      callback(undefined, locationLatAndLon);
    }
  });
};

export default geocode;
