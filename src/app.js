import path from "path";
import express from "express";
import { fileURLToPath } from "url";
import hbs from "hbs";
import forecast from "./utils/forecast.js";
import geocode from "./utils/geocode.js";

const app = express();

//Create a const using fileURLToPath(import.meta.url) to get the current module's filename.
// The method bellow is used, because I'm using the module type in the json file.

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const directory = path.join(__dirname, "../public");

//Setup static directory to serve
app.use(express.static(directory));

const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather app",
    name: "Heloiza",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    description:
      "Web app created fully with Node.JS with the purpose of learning backend development.",
    name: "Heloiza",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    description: "If you want help, ask chatGPT :D!",
    name: "Heloiza",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "An address must be provided!",
    });
  }

  geocode(req.query.address, (error, { latitude, longitude, location }) => {
    if (error) {
      return res.send({ error });
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        forecast: forecastData,
        location,
        address: req.query.address,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 Help",
    errorMessage: "Article not found",
    name: "Heloiza",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Page not found",
    name: "Heloiza",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
