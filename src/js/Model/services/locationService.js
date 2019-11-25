class LocationService {
    constructor() {
        this.locationData = {};
    }

    async getUserLocation() {
        const response = await fetch('https://ipinfo.io/json?token=afabba1958e0bf');
        const data = await response.json()
        this.locationData = data;
        return data;
    }
}

export default LocationService;