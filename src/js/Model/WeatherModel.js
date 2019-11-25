import LocationService from '../locationService';

class WeatherModel {
    constructor() {
        this.location = new LocationService();
        this.userLocation = {};
    }

    async getLocation() {
        this.userLocation = await this.location.getUserLocation();
        return this.userLocation;
    }
}
export default WeatherModel;