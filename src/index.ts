import { EventEmitter } from "events";
import { HttpServer } from "./http-server";
import { WeatherFetcher } from "./weather_fetcher";
import { ContentManager } from "./content_mananger";

export const emitter = new EventEmitter()

const http = new HttpServer()
const contentMananger = new ContentManager()


// const weatherFetcher = new WeatherFetcher()

// weatherFetcher.refresh()



