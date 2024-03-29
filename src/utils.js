export const FieldEvents = ['HJ', 'PV', 'LJ', 'TJ', 'SP', 'DT', 'HT', 'JT', 'Decathlon', 'Heptathlon', 'Pentathlon'];
export const Thons = ['Decathlon', 'Heptathlon', 'Pentathlon'];

export function getSecondsFromTime(time) {
    const timeParts = time.split(':');
    let seconds = 0;
    if (timeParts.length == 3) {
        if (timeParts[1].length < 2 || timeParts[2].length < 2) {
            return 0;
        }
        seconds = parseInt(timeParts[0]) * 3600 + parseInt(timeParts[1]) * 60 + parseFloat(timeParts[2]);
    }
    if (timeParts.length == 2) {
        if (timeParts[1].length < 2) {
            return 0;
        }
        seconds = parseInt(timeParts[0]) * 60 + parseFloat(timeParts[1]);
    }
    if (timeParts.length == 1) {
        seconds = parseFloat(timeParts[0]).toFixed(2)
    }
    return seconds;
}

export function formatSeconds(s) {
    let hours = Math.floor(s / 3600)
    let minutes = Math.floor((s % 3600) / 60)
    let seconds = s % 60
    let time = '';
    if (hours > 0) {
        seconds = Math.round(seconds)
        if (seconds == 60) {
            seconds = 0
            minutes += 1
        }
        if (minutes == 60) {
            minutes = 0
            hours += 1
        }
        time = `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
    } else if (minutes > 0) {
        seconds = Math.round(seconds)
        if (seconds == 60) {
            seconds = 0
            minutes += 1
        }
        time = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
    } else {
        time = `${seconds.toFixed(2)}`
    }
    return time
}

export function formatEvent(e) {
    return {
        'HalfMarathon': 'Half Marathon',
        '2Miles': '2 Miles',
        '3000mSC': '3000m SC',
        '10000m': '10,000m',
        'HJ': 'High Jump',
        'PV': 'Pole Vault',
        'LJ': 'Long Jump',
        'TJ': 'Triple Jump',
        'SP': 'Shot Put',
        'DT': 'Discus',
        'HT': 'Hammer Throw',
        'JT': 'Javelin'
    }[e] || e;
}