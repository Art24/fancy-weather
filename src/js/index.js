// import LocationService from './locationService';
import WeatherController from './Controller/WeatherController';
import WeatherModel from './Model/WeatherModel';
import WeatherView from './View/WeatherView';

// eslint-disable-next-line no-unused-vars
const app = new WeatherController(new WeatherModel(), new WeatherView())