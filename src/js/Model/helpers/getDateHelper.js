const monthsEn = {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December',
}
const weeksEn = {
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
    7: 'Sunday',
}
const monthsRu = {
    1: 'Январь',
    2: 'Февраль',
    3: 'Март',
    4: 'Апрель',
    5: 'Май',
    6: 'Июнь',
    7: 'Июль',
    8: 'Август',
    9: 'Сентябрь',
    10: 'Октябрь',
    11: 'Ноябрь',
    12: 'Декабрь',
}
const weeksRu = {
    1: 'Понедельник',
    2: 'Вторник',
    3: 'Среда',
    4: 'Четверг',
    5: 'Пятница',
    6: 'Суббота',
    7: 'Воскресенье',
}
const monthsBy = {
    1: 'Студзень',
    2: 'Люты',
    3: 'Сакавiк',
    4: 'Красавiк',
    5: 'Май',
    6: 'Червень',
    7: 'Лiпень',
    8: 'Жнiвень',
    9: 'Верасень',
    10: 'Кастрычнiк',
    11: 'Лiстапад',
    12: 'Снежань',
}
const weeksBy = {
    1: 'Панядзелак',
    2: 'Аўторак',
    3: 'Серада',
    4: 'Чацвер',
    5: 'Пятніца',
    6: 'Субота',
    7: 'Нядзеля',
}
function getDateNow(months, weeks) {
    const date = new Date();
    const timeString = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    const dataObj = {
        dayOfWeek: weeks[date.getDay()],
        day: date.getDate(),
        month: months[date.getMonth()],
        time: timeString,
    }
    return dataObj;
}
const dateHelper = function getDateHelper(localization) {
    if (localization === 'en') {
        return getDateNow(monthsEn, weeksEn);
    } if (localization === 'ru') {
        return getDateNow(monthsRu, weeksRu);
    } if (localization === 'by') {
        return getDateNow(monthsBy, weeksBy)
    }
    return getDateNow(monthsEn, weeksEn);
}

export default dateHelper;