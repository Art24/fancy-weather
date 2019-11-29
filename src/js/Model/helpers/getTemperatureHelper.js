const weatherRu = {
    temperature: 'Температура',
    humidity: 'Влажность',
    sky: {
        Clouds: 'Облачно',
        Clear: 'Ясно',
        Rain: 'Дождь',
        Snow: 'Снег'
    },
    wind: 'Ветер',
}
const weatherEn = {
    temperature: 'Temperature',
    humidity: 'Humidity',
    sky: {
        Clouds: 'Clouds',
        Clear: 'Clear',
        Rain: 'Rain',
        Snow: 'Snow'
    },
    wind: 'Wind',
}
const weatherBy = {
    temperature: 'Тэмпература',
    humidity: 'Вільготнасць',
    sky: {
        Clouds: 'Воблачна',
        Clear: 'Ясна',
        Rain: 'Дождж',
        Snow: 'Снег'
    },
    wind: 'Вецер',
}

function convertToFahr(temperatureC) {
    return Math.floor((temperatureC * 9 / 5) + 32);
}

function getTemperatureNow(obj, degreesType, weatherLang) {


    function degreeChecker(period) {
        let tempTemperature = 0;
        if (degreesType === 'C') {
            tempTemperature = obj.list[period].main.temp.toFixed(0);
        } if (degreesType === 'F') {
            tempTemperature = convertToFahr(obj.list[period].main.temp.toFixed(0));
        }    
        return tempTemperature;   
    }
    const weatherAllDays = [];
    const weatherOne = {
        temperature: `${degreeChecker(0)}&deg;`,
        humidity: `${weatherLang.humidity} ${obj.list[0].main.humidity} %`,
        sky: `${weatherLang.sky[obj.list[0].weather[0].main]}`,
        wind: `${weatherLang.wind} ${obj.list[0].wind.speed.toFixed(1)}`,
    }
    const weatherTwo = {
        temperature: `${degreeChecker(8)}&deg;`,
        humidity: `${weatherLang.humidity} ${obj.list[8].main.humidity} %`,
        sky: `${weatherLang.sky[obj.list[8].weather[0].main]}`,
        wind: `${weatherLang.wind} ${obj.list[8].wind.speed.toFixed(1)}`,
    }
    const weatherThree = {
        temperature: `${degreeChecker(16)}&deg;`,
        humidity: `${weatherLang.humidity} ${obj.list[16].main.humidity} %`,
        sky: `${weatherLang.sky[obj.list[16].weather[0].main]}`,
        wind: `${weatherLang.wind} ${obj.list[16].wind.speed.toFixed(1)}`,
    }
    const weatherFour = {
        temperature: `${degreeChecker(24)}&deg;`,
        humidity: `${weatherLang.humidity} ${obj.list[24].main.humidity} %`,
        sky: `${weatherLang.sky[obj.list[24].weather[0].main]}`,
        wind: `${weatherLang.wind} ${obj.list[24].wind.speed.toFixed(1)}`,
    }
    weatherAllDays.push(weatherOne, weatherTwo, weatherThree, weatherFour);
    return weatherAllDays;
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