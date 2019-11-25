 import LocationService from '../locationService';
 import getDateHelper from '../Model/getDateHelper';

class WeatherController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.service = new LocationService();
        this.localization = 'ru';
        this.getLocation();
        this.getDate();
    }

    getLocation() {
        this.service.getUserLocation()
            .then(response => {
                this.view.showUserLocation(response)
            })
    }

    getDate() {
        this.view.showCurrentDate(getDateHelper(this.localization));
    }

}
export default WeatherController;