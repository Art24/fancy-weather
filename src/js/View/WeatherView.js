/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable class-methods-use-this */
import Event from '../event';

class WeatherView {
    constructor(htmlHelper) {
        this.htmlHelper = htmlHelper;
        // eslint-disable-next-line prefer-destructuring
        this.root = document.getElementsByTagName("body")[0];
        this.changeToEngEvent = new Event(this);
        this.changeToRusEvent = new Event(this);
        this.changeToBelEvent = new Event(this);
        this.changeToFahrEvent = new Event(this);
        this.changeToCelEvent = new Event(this);
        this.findCityEvent = new Event(this);
        this.init();
        this.sectionOne = document.getElementById('sectionOne');
    }

    init() {
        const header = this.htmlHelper.createElement('header', 'header-wrapper');
        const sectionOne = this.htmlHelper.createElement('section' , 'weather-now-wrapper');
        const sectionTwo = this.htmlHelper.createElement('section' , 'weather-future-wrapper');
        const sectionThree = this.htmlHelper.createElement('section' , 'geolocation-wrapper')
        header.setAttribute('id', 'header');
        sectionOne.setAttribute('id', 'sectionOne');
        sectionTwo.setAttribute('id', 'sectionTwo');
        sectionThree.setAttribute('id', 'sectionThree');
        this.root.appendChild(header);
        this.root.appendChild(sectionOne);
        this.root.appendChild(sectionTwo);
        this.root.appendChild(sectionThree);
        this.changeLanguageInterface();
        this.changeDegreeInterface();
        this.findCityInterface();
    }

    changeLanguageInterface() {
        this.header = document.getElementById('header');
        const changeLangButtonEn = this.htmlHelper.createButton('submit', 'EN', this.changeToEng.bind(this, 'EN'));
        const changeLangButtonRu = this.htmlHelper.createButton('submit', 'RU', this.changeToRus.bind(this, 'RU'));
        const changeLangButtonBy = this.htmlHelper.createButton('submit', 'BY', this.changeToBel.bind(this, 'BY'));
        this.header.appendChild(changeLangButtonEn);
        this.header.appendChild(changeLangButtonRu);
        this.header.appendChild(changeLangButtonBy);
    }

    changeDegreeInterface() {
        this.header = document.getElementById('header');
        const changeDegreeButtonCel = this.htmlHelper.createButton('submit', 'C', this.changeToCel.bind(this, 'C'));
        const changeDegreeButtonFahr = this.htmlHelper.createButton('submit', 'F', this.changeToFahr.bind(this, 'F'));
        this.header.appendChild(changeDegreeButtonCel);
        this.header.appendChild(changeDegreeButtonFahr);
    }
    
    findCityInterface() {
        this.header = document.getElementById('header');
        const cityInput = this.htmlHelper.createInput('text', 'cityInput', true);
        const findCityButton = this.htmlHelper.createButton('submit', 'Search', this.findCity.bind(this));
        this.header.appendChild(cityInput);
        this.header.appendChild(findCityButton);
    }

    changeToEng(lang) {
        this.sectionOne.innerHTML = '';
        this.changeToEngEvent.notify(lang);
    }

    changeToBel(lang) {
        this.sectionOne.innerHTML = '';
        this.changeToBelEvent.notify(lang);
    }

    changeToRus(lang) {
        this.sectionOne.innerHTML = '';
        this.changeToRusEvent.notify(lang);
    }

    changeToFahr(dergee) {
        const tempNode = document.getElementById('weatherOneInfoList');
        this.sectionOne.removeChild(tempNode);
        this.changeToFahrEvent.notify(dergee);
    }

    changeToCel(dergee) {
        const tempNode = document.getElementById('weatherOneInfoList');
        this.sectionOne.removeChild(tempNode);
        this.changeToCelEvent.notify(dergee);
    }

    findCity() {
        this.sectionOne.innerHTML = '';
        const cityInputValue = document.getElementById('cityInput').value;
        this.findCityEvent.notify(undefined, cityInputValue);
    }

    showUserLocation(city) {
        const userLocationWrapper = this.htmlHelper.createElement('div', 'user-location-wrapper');
        this.sectionOne.appendChild(userLocationWrapper);
        userLocationWrapper.innerHTML = `${city}`;
    }
    
    showCurrentDate(dto) {
        const userTimeWrapper = this.htmlHelper.createElement('div', 'user-time-wrapper');
        this.sectionOne.appendChild(userTimeWrapper);
        userTimeWrapper.innerHTML = `${dto.dayOfWeek} ${dto.day} ${dto.month} ${dto.time}` ;
    }

    showCurrentWeather(dto) {
        const weatherNowWrapper = this.htmlHelper.createElement('ul', 'weather-one-list');
        weatherNowWrapper.setAttribute('id', 'weatherOneInfoList');
        this.sectionOne.appendChild(weatherNowWrapper);
        console.log(dto);
        for(const item in dto)
        {
            const listViewItem = this.htmlHelper.createElement('li');
            listViewItem.innerHTML = dto[item];
            weatherNowWrapper.appendChild(listViewItem);
        }
    }

    showWeatherThreeDays(dto) {
        const weatherFutureWrapper = this.htmlHelper.createElement('div', 'weather-future-wrapper');
        const weatherTwoWrapper = this.htmlHelper.createElement('ul', 'weather-two-list');
        const weatherThreeWrapper = this.htmlHelper.createElement('ul', 'weather-three-list');
        const weatherFourWrapper = this.htmlHelper.createElement('ul', 'weather-four-list');
        weatherTwoWrapper.setAttribute('id', 'weatherTwoInfoList');
        weatherThreeWrapper.setAttribute('id', 'weatherThreeInfoList');
        weatherFourWrapper.setAttribute('id', 'weatherFourInfoList');
        this.sectionOne.appendChild(weatherFutureWrapper);
        weatherFutureWrapper.appendChild(weatherTwoWrapper);
        weatherFutureWrapper.appendChild(weatherThreeWrapper);
        weatherFutureWrapper.appendChild(weatherFourWrapper);
        console.log(dto[1]);
        for(const item in dto[1])
        {
            const listViewItem = this.htmlHelper.createElement('li');
            listViewItem.innerHTML = dto[1][item];
            console.log(item);
            weatherTwoWrapper.appendChild(listViewItem);
        }
        for(const item in dto[2])
        {
            const listViewItem = this.htmlHelper.createElement('li');
            listViewItem.innerHTML = dto[2][item];
            weatherThreeWrapper.appendChild(listViewItem);
        }
        for(const item in dto[3])
        {
            const listViewItem = this.htmlHelper.createElement('li');
            listViewItem.innerHTML = dto[3][item];
            weatherFourWrapper.appendChild(listViewItem);
        }
    }
}
export default WeatherView;