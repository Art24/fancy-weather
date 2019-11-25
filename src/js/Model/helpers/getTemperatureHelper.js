function getTemperatureNow(obj) {
    console.log(obj);
    const tempObj = {
        temperature: obj.list[0].main.temp.toFixed(0),
        humidity: obj.list[0].main.humidity,
        sky: obj.list[0].weather[0].main,
        wind: obj.list[0].wind.speed.toFixed(1),
    }
    return tempObj;
}
const temperatureHelper = function getTempteratureHelper(localization, temperatureNowObj) {
    if (localization === 'en') {
        return getTemperatureNow(temperatureNowObj);
    } if (localization === 'ru') {
        return getTemperatureNow(temperatureNowObj);
    } if (localization === 'by') {
        return getTemperatureNow(temperatureNowObj)
    }
    return getTemperatureNow();
}

export default temperatureHelper;