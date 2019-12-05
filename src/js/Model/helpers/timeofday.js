const day = {
    1: 'night',
    2: 'night',
    3: 'night',
    4: 'night',
    5: 'night',
    6: 'morning',
    7: 'morning',
    8: 'morning',
    9: 'morning',
    10: 'morning',
    11: 'morning',
    12: 'day',
    13: 'day',
    14: 'day',
    15: 'day',
    16: 'day',
    17: 'day',
    18: 'evening',
    19: 'evening',
    20: 'evening',
    21: 'evening',
    22: 'evening',
    23: 'night',
}

export default function timeOfDay(localTime) {
    return day[localTime.formatted.split(' ')[1].split(':')[0]];
}