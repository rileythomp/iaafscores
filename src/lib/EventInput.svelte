<script>
    import { results, warning } from '../store.js';

    let time = '12';
    let points = '';
    let race = '100m';

    function addEvent() {
        let argVal;
        if (time != '' && points != '') {
            console.log('both fields are filled')
            return
        } else if (time == '' && points == '') {
            console.log('both fields are empty')
            return
        } else if (time != '') {
            argVal = `time=${time}`
        } else if (points != '') {
            argVal = `points=${points}`
        }
        
        fetch(`https://kaz3cn5qqtkrdwxnvpey7eex5q0mhokf.lambda-url.us-east-1.on.aws/?race=${race}&${argVal}`)
        .then(response => {
            response.json().then(data => {
                if (response.status != 200) {
                    $warning = data
                    setTimeout(() => {
                        $warning = ''
                    }, 3000)
                    return
                }
                if (time == '') {
                    let hours = Math.floor(data / 3600)
                    let minutes = Math.floor((data % 3600) / 60)
                    let seconds = data % 60
                    if (hours > 0) {
                        seconds = Math.round(seconds)
                        data = `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
                    } else if (minutes > 0) {
                        seconds = Math.round(seconds)
                        data = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
                    } else {
                        data = `${seconds.toFixed(2)}`
                    }
                    $results = [...$results, {race: race, time: data, points: points}]
                } else if (points == '') {
                    $results = [...$results, {race: race, time: time, points: data}]
                }
            })
        }).catch(error => {
            console.log(error);
        });
    }
</script>

<div id='event-input' class='container'>
    <select bind:value={race} >
        <option value="100m">100m</option>
        <option value="200m">200m</option>
        <option value="400m">400m</option>
        <option value="800m">800m</option>
        <option value="1500m">1500m</option>
        <option value="Mile">Mile</option>
        <option value="3000m">3000m</option>
        <option value="5000m">5000m</option>
        <option value="10000m">10000m</option>
        <option value="HalfMarathon">Half Marathon</option>
        <option value="Marathon">Marathon</option>
        <option value="110mH">110mH</option>
        <option value="400mH">400mH</option>
        <option value="3000mSC">3000mSC</option>
    </select>

    <input type="text" placeholder='Time' bind:value={time}>

    <input type="text" placeholder='Points' bind:value={points}>

    <button on:click={addEvent}>+</button>
</div>
  

<style>
    .container {
        display: flex;
        flex-direction: row;
        padding: 1em;
        padding-left: 2em;
    }

    select, input {
        margin-right: 2em;
    }
</style>