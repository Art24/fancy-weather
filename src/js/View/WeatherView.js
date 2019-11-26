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
    
    changeToEng(lang) {
        this.sectionOne.innerHTML = '';
        this.changeToEngEvent.notify(lang);
    }

    changeToBel(lang) {
        this.sectionOne.innerHTML = '';
        this.changeToBelEvent.notify(lang);
    }

    changeToRus(dergee) {
        this.sectionOne.innerHTML = '';
        this.changeToRusEvent.notify(dergee);
    }

    changeToFahr(dergee) {
        this.sectionOne.innerHTML = '';
        this.changeToFahrEvent.notify(dergee);
    }

    changeToCel(dergee) {
        this.sectionOne.innerHTML = '';
        this.changeToCelEvent.notify(dergee);
    }

    showUserLocation(dto) {
        const userLocationWrapper = this.htmlHelper.createElement('div', 'user-location-wrapper');
        this.sectionOne.appendChild(userLocationWrapper);
        userLocationWrapper.innerHTML = `${dto.city} , ${dto.country}`;
    }
    
    showCurrentDate(dto) {
        const userTimeWrapper = this.htmlHelper.createElement('div', 'user-time-wrapper');
        this.sectionOne.appendChild(userTimeWrapper);
        userTimeWrapper.innerHTML = `${dto.dayOfWeek} ${dto.day} ${dto.month} ${dto.time}` ;
    }

    showCurrentWeather(dto) {
        const weatherNowWrapper = this.htmlHelper.createElement('ul', 'weather-now-wrapper');
        this.sectionOne.appendChild(weatherNowWrapper);
        for(const item in dto)
        {
            const listViewItem = this.htmlHelper.createElement('li');
            listViewItem.innerHTML = dto[item];
            weatherNowWrapper.appendChild(listViewItem);
        }
    }
}
export default WeatherView;