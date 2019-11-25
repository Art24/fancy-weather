/* eslint-disable no-unused-vars */
 import LocationService from '../Model/services/locationService';
 import getDateHelper from '../Model/helpers/getDateHelper';
 import WeatherService from '../Model/services/weatherService';
 import temperatureHelper from '../Model/helpers/getTemperatureHelper';

class WeatherController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.locationService = new LocationService();
        this.weatherService = new WeatherService();
        this.localization = 'ru';
        this.city = 'Minsk'
        this.getLocation();
    }

    getLocation() {
        this.locationService.getUserLocation()
            .then(response => this.view.showUserLocation(response))
            .then(res => {
                this.getDate();
            })
            .then( _ => {
                this.getWeather(this.localization, this.city);
            })
    }

    getDate() {
        const currentTime = getDateHelper(this.localization);
        this.view.showCurrentDate(currentTime);
    }

    getWeather(localization, city) {
        this.weatherService.getWeather(city, localization)
        .then(res => {
            const currentWeather = temperatureHelper(localization, res);
            return currentWeather;
        })
        .then(currentWeather => this.view.showCurrentWeather(currentWeather));
    }

   

}
export default WeatherController;