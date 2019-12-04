class WeatherService {
    constructor() {
        this.weatherData = {};
    }

    async getWeather(city, lang) {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=${lang}&units=metric&APPID=35d8d587f08459978733e4ff2c6e3870`);
        const data = await response.json();
        this.locationData = data;
        console.log(data);
        return data;
    }
}

export default WeatherService;