/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable class-methods-use-this */
class WeatherView {
    constructor() {
        // eslint-disable-next-line prefer-destructuring
        this.root = document.getElementsByTagName("body")[0];
        this.init();
    }

    createElement(tag, className) {
        const element = document.createElement(tag)
        if (className) element.classList.add(className);
        return element
    }

    init() {
        const header = this.createElement('header', 'header-wrapper');
        const sectionOne = this.createElement('section' , 'weather-now-wrapper');
        const sectionTwo = this.createElement('section' , 'weather-future-wrapper');
        const sectionThree = this.createElement('section' , 'geolocation-wrapper')
        header.setAttribute('id', 'header');
        sectionOne.setAttribute('id', 'sectionOne');
        sectionTwo.setAttribute('id', 'sectionTwo');
        sectionThree.setAttribute('id', 'sectionThree');
        this.root.appendChild(header);
        this.root.appendChild(sectionOne);
        this.root.appendChild(sectionTwo);
        this.root.appendChild(sectionThree);
    }

    showUserLocation(dto) {
        this.sectionOne = document.getElementById('sectionOne');
        const userLocationWrapper = this.createElement('div', 'user-location-wrapper');
        this.sectionOne.appendChild(userLocationWrapper);
        userLocationWrapper.innerHTML = `${dto.city} , ${dto.country}`;
    }
    
    showCurrentDate(dto) {
        this.sectionOne = document.getElementById('sectionOne');
        const userTimeWrapper = this.createElement('div', 'user-time-wrapper');
        this.sectionOne.appendChild(userTimeWrapper);
        userTimeWrapper.innerHTML = `${dto.dayOfWeek} ${dto.day} ${dto.month} ${dto.time}` ;
    }

    showCurrentWeather(dto) {
        console.log(dto);
        this.sectionOne = document.getElementById('sectionOne');
        const weatherNowWrapper = this.createElement('ul', 'weather-now-wrapper');
        this.sectionOne.appendChild(weatherNowWrapper);
        for(const item in dto)
        {
            const listViewItem = document.createElement('li');
            listViewItem.innerHTML = dto[item];
            weatherNowWrapper.appendChild(listViewItem);
        }
    }
}
export default WeatherView;