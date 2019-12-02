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
        this.sectionTwo = document.getElementById('sectionTwo');
        this.sectionThree = document.getElementById('sectionThree');
        this.loader = document.getElementById('loader');
        this.attachClickEvents();
    }

    init() {
        const header = this.htmlHelper.createElement('header', 'header-wrapper');
        const sectionOne = this.htmlHelper.createElement('section' , 'weather-now-wrapper');
        const sectionTwo = this.htmlHelper.createElement('section' , 'weather-future-wrapper');
        const sectionThree = this.htmlHelper.createElement('section' , 'geolocation-wrapper');
        // geolocation map
        const map = this.htmlHelper.createElement('div');
        map.setAttribute('id', 'map');
        sectionThree.appendChild(map);
        const loader = this.htmlHelper.createElement('div', 'lds-roller');
        loader.setAttribute('id', 'loader');
        for (let i = 0; i < 8; i += 1) {
            const circle = this.htmlHelper.createElement('div');
            loader.appendChild(circle);
        } 
        header.setAttribute('id', 'header');
        sectionOne.setAttribute('id', 'sectionOne');
        sectionTwo.setAttribute('id', 'sectionTwo');
        sectionThree.setAttribute('id', 'sectionThree');
        this.root.appendChild(header);
        this.root.appendChild(sectionOne);
        this.root.appendChild(sectionTwo);
        this.root.appendChild(sectionThree);
        this.root.appendChild(loader);
        this.changeLanguageInterface();
        this.changeDegreeInterface();
        this.findCityInterface();
    }

    changeLanguageInterface() {
        this.header = document.getElementById('header');
        const langBar = this.htmlHelper.createElement('div' , 'choose-language-bar');
        const changeLangButtonEn = this.htmlHelper.createButton('submit', 'EN', this.changeToEng.bind(this, 'EN'));
        const changeLangButtonRu = this.htmlHelper.createButton('submit', 'RU', this.changeToRus.bind(this, 'RU'));
        const changeLangButtonBy = this.htmlHelper.createButton('submit', 'BY', this.changeToBel.bind(this, 'BY'));
        changeLangButtonEn.setAttribute('class', 'btn btn-language');
        changeLangButtonRu.setAttribute('class', 'btn btn-language active');
        changeLangButtonBy.setAttribute('class', 'btn btn-language');
        langBar.appendChild(changeLangButtonEn);
        langBar.appendChild(changeLangButtonRu);
        langBar.appendChild(changeLangButtonBy);
        this.header.appendChild(langBar);
    }

    changeDegreeInterface() {
        this.header = document.getElementById('header');
        const degreeBar = this.htmlHelper.createElement('div' , 'choose-degree-bar');
        const changeDegreeButtonCel = this.htmlHelper.createButton('submit', 'C', this.changeToCel.bind(this, 'C'));
        const changeDegreeButtonFahr = this.htmlHelper.createButton('submit', 'F', this.changeToFahr.bind(this, 'F'));
        changeDegreeButtonCel.setAttribute('class', 'btn btn-degree active');
        changeDegreeButtonFahr.setAttribute('class', 'btn btn-degree');
        degreeBar.appendChild(changeDegreeButtonCel);
        degreeBar.appendChild(changeDegreeButtonFahr);
        this.header.appendChild(degreeBar);
        
    }
    
    findCityInterface() {
        this.header = document.getElementById('header');
        const searchBar = this.htmlHelper.createElement('div' , 'search-bar');
        const cityInput = this.htmlHelper.createInput('text', 'cityInput');
        cityInput.setAttribute('x-webkit-speech', '');
        const findCityButton = this.htmlHelper.createButton('submit', 'Search', this.findCity.bind(this));
        findCityButton.setAttribute('class', 'btn');
        searchBar.appendChild(cityInput);
        searchBar.appendChild(findCityButton);
        this.header.appendChild(searchBar);
    }

    clearActiveLanguages() {
        this.header.querySelectorAll('.btn-language').forEach((item) => {
            item.classList.remove('active');
        });
    }

    clearActiveDegrees() {
        this.header.querySelectorAll('.btn-degree').forEach((item) => {
            item.classList.remove('active');
        });
    }
    
    disableButton() {
        this.header.querySelectorAll('.btn').forEach((item) => {
            // eslint-disable-next-line no-param-reassign
            item.disabled = true;
            setTimeout(() => {
                // eslint-disable-next-line no-param-reassign
                item.disabled = false;
            }, 1000)
        });
    }

    changeToEng(lang) {
        this.clearActiveLanguages();
        this.sectionOne.innerHTML = '';
        this.sectionTwo.innerHTML = '';
        this.disableButton();
        this.changeToEngEvent.notify(lang);
    }

    changeToBel(lang) {
        this.clearActiveLanguages();
        this.sectionOne.innerHTML = '';
        this.sectionTwo.innerHTML = '';
        this.disableButton();
        this.changeToBelEvent.notify(lang);
    }

    changeToRus(lang) {
        this.clearActiveLanguages();
        this.sectionOne.innerHTML = '';
        this.sectionTwo.innerHTML = '';
        this.disableButton();
        this.changeToRusEvent.notify(lang);
    }

    attachClickEvents() {
        document.querySelectorAll('.btn-language').forEach((item) => {
            item.addEventListener('click', function() {
                item.classList.add('active');
            })
        });
        document.querySelectorAll('.btn-degree').forEach((item) => {
            item.addEventListener('click', function() {
                item.classList.add('active');
            })
        });
    }

    removeLegacyNodes() {
        const mainTemp = document.getElementById('mainTemperature')
        const tempNode = document.getElementById('weatherOneInfoList');
        mainTemp.removeChild(tempNode);
        mainTemp.removeChild(document.getElementById('bigTemperature'));
        const futureList = document.getElementById('weatherFutureList');
        const tempNode2 = document.getElementById('weatherTwoInfoList');
        const tempNode3 = document.getElementById('weatherThreeInfoList');
        const tempNode4 = document.getElementById('weatherFourInfoList');
        futureList.removeChild(tempNode2);
        futureList.removeChild(tempNode3);
        futureList.removeChild(tempNode4);
    }

    changeToFahr(dergee) {
        this.clearActiveDegrees();
        this.removeLegacyNodes();
        this.changeToFahrEvent.notify(dergee);
    }

    changeToCel(dergee) {
        this.clearActiveDegrees();
        this.removeLegacyNodes();
        this.changeToCelEvent.notify(dergee);
    }

    findCity() {
        this.sectionOne.innerHTML = '';
        this.sectionTwo.innerHTML = '';
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
        let wrapper;
        console.log(document.getElementById('mainTemperature'));
        if(!document.getElementById('mainTemperature')) {
            wrapper = this.htmlHelper.createElement('div', 'main-temperature');
            wrapper.setAttribute('id', 'mainTemperature');
        } else {
            wrapper = document.getElementById('mainTemperature');
        }
        const temperature = this.htmlHelper.createElement('span', 'big-temperature');
        temperature.setAttribute('id', 'bigTemperature');
        temperature.innerHTML = dto.temperature;
        wrapper.appendChild(temperature);
        const weatherNowWrapper = this.htmlHelper.createElement('ul', 'weather-one-list');
        weatherNowWrapper.setAttribute('id', 'weatherOneInfoList');
        wrapper.appendChild(weatherNowWrapper);
        for(const item in dto)
        {
            if (item !== 'temperature') {
                const listViewItem = this.htmlHelper.createElement('li');
                listViewItem.innerHTML = dto[item];
                weatherNowWrapper.appendChild(listViewItem);
            }
            
        }
        this.sectionOne.appendChild(wrapper);

    }

    showWeatherThreeDays(dto) {
        let weatherFutureWrapper;
        if (!document.getElementById('weatherFutureList')) {
            weatherFutureWrapper = this.htmlHelper.createElement('div', 'weather-future-list');
            weatherFutureWrapper.setAttribute('id', 'weatherFutureList');
            this.sectionTwo.appendChild(weatherFutureWrapper);
        } else {
            weatherFutureWrapper = document.getElementById('weatherFutureList')
        }
        const weatherTwoWrapper = this.htmlHelper.createElement('ul', 'weather-two-list');
        const weatherThreeWrapper = this.htmlHelper.createElement('ul', 'weather-three-list');
        const weatherFourWrapper = this.htmlHelper.createElement('ul', 'weather-four-list');
        weatherTwoWrapper.setAttribute('id', 'weatherTwoInfoList');
        weatherThreeWrapper.setAttribute('id', 'weatherThreeInfoList');
        weatherFourWrapper.setAttribute('id', 'weatherFourInfoList');
        weatherFutureWrapper.appendChild(weatherTwoWrapper);
        weatherFutureWrapper.appendChild(weatherThreeWrapper);
        weatherFutureWrapper.appendChild(weatherFourWrapper);
        for(const item in dto[1])
        {
            const listViewItem = this.htmlHelper.createElement('li');
            listViewItem.innerHTML = dto[1][item];
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

    startLoad() {
        this.sectionOne.style.display = 'none';
        this.sectionTwo.style.display = 'none';
        this.sectionThree.style.display = 'none';
        this.loader.style.display = 'inline-block'
    }
    
    endLoad() {
        this.sectionOne.style.display = 'flex';
        this.sectionTwo.style.display = 'flex';
        this.sectionThree.style.display = 'flex';
        this.loader.style.display = 'none';
    }
}
export default WeatherView;