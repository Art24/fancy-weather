/* eslint-disable class-methods-use-this */
export default class CoordsLanguageHelper {

    getCoordLang(lang, lat, lon) {
        console.log(lang, lat, lon);
        if (lang === 'RU') {
            return {lon: `Долгота: ${lon}`, lat: `Широта: ${lat}`}
        } if (lang === 'EN') {
            return {lon: `Longitude: ${lon}`, lat: `Latitude: ${lat}`}
        } if (lang === 'BY') {
            return {lon: `Даўгата: ${lon}`, lat: `Шырата: ${lat}`}
        }
        return 0;
    }
}