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
        this.view.changeToFahrEvent.attach(this.getLocationAndDegree.bind(this));
        this.view.changeToCelEvent.attach(this.getLocationAndDegree.bind(this));

    }

    getLocation(sender, localization) {
        // eslint-disable-next-line no-unused-expressions
        localization ? this.localization = localization : localization;
        this.locationService.getUserLocation()
            .then(response => this.view.showUserLocation(response))
            .then(res => {
                this.getDate(localization || this.localization);
            })
            .then( _ => {
                this.getWeather(localization || this.localization, this.degreesType, this.city);
            })
    }

    getLocationAndDegree(sender, degree) {
        // eslint-disable-next-line no-unused-expressions
        degree ? this.degreesType = degree : degree;
        this.locationService.getUserLocation()
            .then(response => this.view.showUserLocation(response))
            .then(res => {
                this.getDate(this.localization);
            })
            .then( _ => {
                this.getWeather(this.localization, degree || this.degreesType, this.city);
            })
    }

    getDate(localization) {
        const currentTime = getDateHelper(localization);
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