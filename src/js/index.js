// import LocationService from './locationService';
import WeatherController from './Controller/WeatherController';
import WeatherModel from './Model/WeatherModel';
import WeatherView from './View/WeatherView';
import HtmlElementService from './Model/helpers/htmlElementHelper';

const htmlService = new HtmlElementService();
// eslint-disable-next-line no-unused-vars
const app = new WeatherController(new WeatherModel(), new WeatherView(htmlService))