export const FieldEvents = ['HJ', 'PV', 'LJ', 'TJ', 'SP', 'DT', 'HT', 'JT', 'Decathlon'];

export function getSecondsFromTime(time) {
    const timeParts = time.split(':');
    let seconds = 0;
    if (timeParts.length == 3) {
        if (timeParts[1].length != 2 || timeParts[2].length != 2) {
            return 0;
        }
        seconds = parseInt(timeParts[0]) * 3600 + parseInt(timeParts[1]) * 60 + parseInt(timeParts[2]);
    }
    if (timeParts.length == 2) {
        if (timeParts[1].length != 2) {
            return 0;
        }
        seconds = parseInt(timeParts[0]) * 60 + parseInt(timeParts[1]);
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
        time = `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
    } else if (minutes > 0) {
        seconds = Math.round(seconds)
        time = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
    } else {
        time = `${seconds.toFixed(2)}`
    }
    return time
}

export function formatEvent(e) {
    if (e == 'HalfMarathon') {
        e = 'Half Marathon'
    }
    else if (e == 'HJ') {
        e = 'High Jump'
    }
    else if (e == 'PV') {
        e = 'Pole Vault'
    }
    else if (e == 'LJ') {
        e = 'Long Jump'
    }
    else if (e == 'TJ') {
        e = 'Triple Jump'
    }
    else if (e == 'SP') {
        e = 'Shot Put'
    }
    else if (e == 'DT') {
        e = 'Discus'
    }
    else if (e == 'HT') {
        e = 'Hammer Throw'
    }
    else if (e == 'JT') {
        e = 'Javelin'
    }
    return e
}