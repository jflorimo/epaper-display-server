import { HttpServer } from "./http-server";
import { WeatherFetcher } from "./weather_fetcher";

const http = new HttpServer()
const weatherFetcher = new WeatherFetcher()

weatherFetcher.refresh()