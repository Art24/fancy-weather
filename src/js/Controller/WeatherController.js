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
        this.localization = 'BY';
        this.city = 'Minsk'
        this.degreesType = 'F';
        this.getLocation();
        this.view.changeToEngEvent.attach(this.getLocation.bind(this));
        this.view.changeToRusEvent.attach(this.getLocation.bind(this));
        this.view.changeToBelEvent.attach(this.getLocation.bind(this));

    }

    getLocation(sender, localization) {
        this.locationService.getUserLocation()
            .then(response => this.view.showUserLocation(response))
            .then(res => {
                this.getDate();
            })
            .then( _ => {
                this.getWeather(localization || this.localization, this.degreesType, this.city);
            })
    }

    getDate() {
        const currentTime = getDateHelper(this.localization);
        this.view.showCurrentDate(currentTime);
    }

    getWeather(localization, degreesType, city) {
        this.weatherService.getWeather(city, localization)
        .then(res => {
            const currentWeather = temperatureHelper(localization, degreesType, res);
            return currentWeather;
        })
        .then(currentWeather => this.view.showCurrentWeather(currentWeather));
    }

   

}
export default WeatherController;