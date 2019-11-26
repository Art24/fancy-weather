const monthsEn = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December',
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
    0: 'Январь',
    1: 'Февраль',
    2: 'Март',
    3: 'Апрель',
    4: 'Май',
    5: 'Июнь',
    6: 'Июль',
    7: 'Август',
    8: 'Сентябрь',
    9: 'Октябрь',
    10: 'Ноябрь',
    11: 'Декабрь',
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
    if (localization === 'EN') {
        return getDateNow(monthsEn, weeksEn);
    } if (localization === 'RU') {
        return getDateNow(monthsRu, weeksRu);
    } if (localization === 'BY') {
        return getDateNow(monthsBy, weeksBy)
    }
    return getDateNow(monthsEn, weeksEn);
}

export default dateHelper;