class CustomLocationService {
    constructor() {
        this.locationData = {};
    }

    async getCustomLocation(lat, lng) {
        const response = await fetch(`http://api.timezonedb.com/v2.1/get-time-zone?key=4YRYZRZ0RTST&format=json&by=position&lat=${lat}&lng=${lng}`);
        const data = await response.json()
        this.locationData = data;
        return data;
    }
}

export default CustomLocationService;