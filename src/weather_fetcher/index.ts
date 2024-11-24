import { fetchWeatherApi } from 'openmeteo';


export class WeatherFetcher {
    constructor() {

    }


    public async refresh() {


        const params = {
            "latitude": 48.9047,
            "longitude": 2.2469,
            "current": ["temperature_2m", "relative_humidity_2m", "apparent_temperature", "precipitation", "rain", "showers", "snowfall", "weather_code", "cloud_cover", "wind_speed_10m", "wind_direction_10m"],
            "hourly": ["temperature_2m", "relative_humidity_2m", "apparent_temperature", "precipitation"],
            "timezone": "auto",
            "models": "meteofrance_seamless"
        };
        const url = "https://api.open-meteo.com/v1/forecast";
        const responses = await fetchWeatherApi(url, params);

        // Helper function to form time ranges
        const range = (start: number, stop: number, step: number) =>
            Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

        // Process first location. Add a for-loop for multiple locations or weather models
        const response = responses[0];

        // Attributes for timezone and location
        const utcOffsetSeconds = response.utcOffsetSeconds();
        const timezone = response.timezone();
        const timezoneAbbreviation = response.timezoneAbbreviation();
        const latitude = response.latitude();
        const longitude = response.longitude();

        const current = response.current()!;
        const hourly = response.hourly()!;

        // Note: The order of weather variables in the URL query and the indices below need to match!
        const weatherData = {
            current: {
                time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
                temperature2m: current.variables(0)!.value(),
                relativeHumidity2m: current.variables(1)!.value(),
                apparentTemperature: current.variables(2)!.value(),
                precipitation: current.variables(3)!.value(),
                rain: current.variables(4)!.value(),
                showers: current.variables(5)!.value(),
                snowfall: current.variables(6)!.value(),
                weatherCode: current.variables(7)!.value(),
                cloudCover: current.variables(8)!.value(),
                windSpeed10m: current.variables(9)!.value(),
                windDirection10m: current.variables(10)!.value(),
            },
            hourly: {
                time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
                    (t) => new Date((t + utcOffsetSeconds) * 1000)
                ),
                temperature2m: hourly.variables(0)!.valuesArray()!,
                relativeHumidity2m: hourly.variables(1)!.valuesArray()!,
                apparentTemperature: hourly.variables(2)!.valuesArray()!,
                precipitation: hourly.variables(3)!.valuesArray()!,
            },

        };
        console.log(weatherData.current)

        // // `weatherData` now contains a simple structure with arrays for datetime and weather data
        // for (let i = 0; i < weatherData.hourly.time.length; i++) {
        //     console.log(
        //         weatherData.hourly.time[i].toISOString(),
        //         weatherData.hourly.temperature2m[i],
        //         weatherData.hourly.relativeHumidity2m[i],
        //         weatherData.hourly.apparentTemperature[i],
        //         weatherData.hourly.precipitation[i]
        //     );
        // }

    }
}