export const FieldEvents = ['HJ', 'PV', 'LJ', 'TJ', 'SP', 'DT', 'HT', 'JT', 'Decathlon'];

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