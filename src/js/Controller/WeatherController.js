/* eslint-disable no-unused-expressions */
/* eslint-disable class-methods-use-this */
 import LocationService from '../Model/services/locationService';
 import getDateHelper from '../Model/helpers/getDateHelper';
 import WeatherService from '../Model/services/weatherService';
 import temperatureHelper from '../Model/helpers/getTemperatureHelper';
 import CustomLocationService from '../Model/services/customLocationService';
 import MapService from '../Model/services/mapService';
 import BackgroundImageService from '../Model/services/backgroundImageService';
 import detectTimeOfDay from '../Model/helpers/timeofday';
 import CoordsLanguageHelper from '../Model/helpers/coordsLanguageHelper';

class WeatherController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.backgroundImageService = new BackgroundImageService();
        this.locationService = new LocationService();
        this.weatherService = new WeatherService();
        this.customLocationService = new CustomLocationService();
        this.mapService = new MapService();
        this.coordsLanguageHelper = new CoordsLanguageHelper();
        this.localization = localStorage.getItem('localization') || 'RU';
        this.city = undefined;
        this.degreesType = localStorage.getItem('degreestype') || 'C';
        this.invoker();
        this.lastWeather = undefined;
        this.currentCoords = undefined;
        this.changeBackgroundOptions = undefined;
        this.view.changeBackgroundEvent.attach(this.changeBackground.bind(this));
        this.view.changeToEngEvent.attach(this.invoker.bind(this));
        this.view.changeToRusEvent.attach(this.invoker.bind(this));
        this.view.changeToBelEvent.attach(this.invoker.bind(this));
        this.view.changeToFahrEvent.attach(this.getLocationAndDegree.bind(this));
        this.view.changeToCelEvent.attach(this.getLocationAndDegree.bind(this));
        this.view.findCityEvent.attach(this.invoker.bind(this));
    }

    getLocation(sender, localization, cityName, degreesType, isChangebackground) {
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
                if (isChangebackground !== false) {
                    this.changeBackground(null, `${coords.main} ${detectTimeOfDay(localTime)}`);
                }
                this.changeBackgroundOptions = `${coords.main} ${detectTimeOfDay(localTime)}`;
                this.getDate(localization, localTime.formatted);
                this.showUserLocation(coords.name);
                return coords;
            })
            .then((coords) => {
                this.mapService.getMap(coords.coords.lat, coords.coords.lon);
                this.showCoords(coords.coords.lat, coords.coords.lon);
            })
            .then(() => {
                this.endLoad();
            })
    }

    changeBackground(sender, main) {
        this.backgroundImageService.getBackgroundImage(main || this.changeBackgroundOptions )
        .then((res) => {
            return res.urls.raw;
        })
        .then((img) => {
            this.view.setBackground(img); 
        })        
    }

    getLocalTime(lat, lng) {
        return this.customLocationService.getCustomLocation(lat, lng)
        .then(res => res);
    }

    invoker(sender, localization, cityName, degreesType) {
        let isChangeBackground = true;
        if (localization) { 
            isChangeBackground = false;
        }
        localization ? this.localization = localization : localization;
        cityName ? this.city = cityName : cityName;
        degreesType ? this.degreesType = degreesType : degreesType;
        localization ? localStorage.setItem('localization', localization) : localStorage.setItem('localization', this.localization);
        this.getLocation(sender, this.localization, this.city, this.degreesType, isChangeBackground);
    }

    getLocationAndDegree(sender, degreesType) {
        this.degreesType = degreesType;
        localStorage.setItem('degreestype', degreesType);
        const currentWeather = temperatureHelper(this.localization, degreesType, this.lastWeather);
        this.view.showCurrentWeather(currentWeather[0]);
        this.view.showWeatherThreeDays(currentWeather);
    }

    getDate(localization, localTime) {
        const currentTime = getDateHelper(localization, localTime);
        this.view.showCurrentDate(currentTime);
    }

    showCoords(lat, lon) {
        this.view.showCoords(this.coordsLanguageHelper.getCoordLang(this.localization, lat, lon));
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

    showUserLocation(name) {
        this.view.showUserLocation(name);
    }

    grabCityInfo(dto) {
        return {
            coords: dto.city.coord,
            name: dto.city.name,
            main: dto.list[0].weather[0].main,
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