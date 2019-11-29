/* eslint-disable no-unused-expressions */
/* eslint-disable class-methods-use-this */
 import LocationService from '../Model/services/locationService';
 import getDateHelper from '../Model/helpers/getDateHelper';
 import WeatherService from '../Model/services/weatherService';
 import temperatureHelper from '../Model/helpers/getTemperatureHelper';
 import CustomLocationService from '../Model/services/customLocationService';

class WeatherController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.locationService = new LocationService();
        this.weatherService = new WeatherService();
        this.customLocationService = new CustomLocationService();
        this.localization = 'RU';
        this.city = undefined;
        this.degreesType = 'C';
        this.invoker();
        this.lastWeather = undefined;
        this.currentCoords = undefined;
        this.view.changeToEngEvent.attach(this.invoker.bind(this));
        this.view.changeToRusEvent.attach(this.invoker.bind(this));
        this.view.changeToBelEvent.attach(this.invoker.bind(this));
        this.view.changeToFahrEvent.attach(this.getLocationAndDegree.bind(this));
        this.view.changeToCelEvent.attach(this.getLocationAndDegree.bind(this));
        this.view.findCityEvent.attach(this.invoker.bind(this));
    }

    getLocation(sender, localization, cityName, degreesType) {
        // eslint-disable-next-line no-unused-expressions
        this.locationService.getUserLocation()
            .then((res) => {
                this.startLoad();
                return cityName || res.city;
            })
            .then(async (city) => {
                const coords = await this.getWeather(localization, degreesType, city);
                return coords;
            })
            .then(async (coords) => {
                const localTime = await this.getLocalTime(coords.coords.lat, coords.coords.lon);
                this.view.showUserLocation(coords.name);
                this.getDate(localization, localTime.formatted);
            })
            .then(() => {
                this.endLoad();
            });
    }

    getLocalTime(lat, lng) {
        return this.customLocationService.getCustomLocation(lat, lng)
        .then(res => res);
    }

    invoker(sender, localization, cityName, degreesType) {
        localization ? this.localization = localization : localization;
        cityName ? this.city = cityName : cityName;
        degreesType ? this.degreesType = degreesType : degreesType;
        this.getLocation(sender, this.localization, this.city, this.degreesType);
    }


    getLocationAndDegree(sender, degreesType) {
        this.degreesType = degreesType;
        const currentWeather = temperatureHelper(this.localization, degreesType, this.lastWeather);
        this.view.showCurrentWeather(currentWeather[0]);
        this.view.showWeatherThreeDays(currentWeather);
    }

    getDate(localization, localTime) {
        const currentTime = getDateHelper(localization, localTime);
        this.view.showCurrentDate(currentTime);
    }

    async getWeather(localization, degreesType, city) {
        let temp;
        await this.weatherService.getWeather(city, localization)
        .then(res => {
            const currentWeather = temperatureHelper(localization, degreesType, res);
            this.lastWeather = res;
            temp = this.grabCityInfo(res);
            return currentWeather;
        })
        .then(currentWeather => {
            this.view.showCurrentWeather(currentWeather[0]);
            this.view.showWeatherThreeDays(currentWeather);
        });
        return temp;
    }

    grabCityInfo(dto) {
        return {
            coords: dto.city.coord,
            name: dto.city.name,
        };
    }
    
    startLoad() {
        this.view.startLoad();
    }

    endLoad() {
        this.view.endLoad();
    }

   

}
export default WeatherController;