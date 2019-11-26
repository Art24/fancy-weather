const weatherRu = {
    temperature: 'Температура',
    humidity: 'Влажность',
    sky: {
        Clouds: 'Облачно',
        Clear: 'Ясно',
        Rain: 'Дождь'
    },
    wind: 'Ветер',
}
const weatherEn = {
    temperature: 'Temperature',
    humidity: 'Humidity',
    sky: {
        Clouds: 'Clouds',
        Clear: 'Clear',
        Rain: 'Rain'
    },
    wind: 'Wind',
}
const weatherBy = {
    temperature: 'Тэмпература',
    humidity: 'Вільготнасць',
    sky: {
        Clouds: 'Воблачна',
        Clear: 'Ясна',
        Rain: 'Дождж'
    },
    wind: 'Вецер',
}

function convertToFahr(temperatureC) {
    return (temperatureC * 9 / 5) + 32;
}

function getTemperatureNow(obj, degreesType, weatherLang) {
    let tempTemperature = 0;
    // converter to another degrees
    if (degreesType === 'C') {
        tempTemperature = obj.list[0].main.temp.toFixed(0);
    } if (degreesType === 'F') {
        tempTemperature = convertToFahr(obj.list[0].main.temp.toFixed(0));
    }
    const tempObj = {
        temperature: `${weatherLang.temperature} ${tempTemperature} ${degreesType}`,
        humidity: `${weatherLang.humidity} ${obj.list[0].main.humidity} %`,
        sky: `${weatherLang.sky[obj.list[0].weather[0].main]}`,
        wind: `${weatherLang.wind} ${obj.list[0].wind.speed.toFixed(1)}`,
    }
    return tempObj;
}
const temperatureHelper = function getTempteratureHelper(localization, degreesType, temperatureNowObj) {
    if (localization === 'EN') {
        return getTemperatureNow(temperatureNowObj, degreesType, weatherEn);
    } if (localization === 'RU') {
        return getTemperatureNow(temperatureNowObj, degreesType, weatherRu);
    } if (localization === 'BY') {
        return getTemperatureNow(temperatureNowObj, degreesType, weatherBy)
    }
    return getTemperatureNow();
}
export default temperatureHelper;