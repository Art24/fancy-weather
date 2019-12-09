const day = {
    '01': 'night',
    '02': 'night',
    '03': 'night',
    '04': 'night',
    '05': 'night',
    '06': 'morning',
    '07': 'morning',
    '08': 'morning',
    '09': 'morning',
    '10': 'morning',
    '11': 'morning',
    '12': 'day',
    '13': 'day',
    '14': 'day',
    '15': 'day',
    '16': 'day',
    '17': 'day',
    '18': 'evening',
    '19': 'evening',
    '20': 'evening',
    '21': 'evening',
    '22': 'evening',
    '23': 'night',
}

export default function timeOfDay(localTime) {
    return day[localTime.formatted.split(' ')[1].split(':')[0]];
}