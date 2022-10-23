<script>
    import { results, warning } from '../store.js';
    import { formatSeconds, formatEvent, getSecondsFromTime, FieldEvents } from '../utils.js';

    let performance = '12';
    let points = '';
    let event = '100m';

    let includeField = false;

    function addEvent() {
        let argVal;
        if (performance != '' && points != '') {
            console.log('both fields are filled')
            $warning = 'Must enter only one of a performance or points.';
            setTimeout(() => {
                $warning = '';
            }, 3000);
            return
        } else if (performance == '' && points == '') {
            console.log('both fields are empty')
            $warning = 'Must enter one of a performance or points.';
            setTimeout(() => {
                $warning = '';
            }, 3000);
            return
        } else if (performance != '') {
            if (FieldEvents.includes(event)) {
                argVal = `performance=${performance}`
            } else {
                let seconds = getSecondsFromTime(performance)
                if (seconds == 0) {
                    $warning = 'Time must be formatted as hh:mm:ss or mm:ss.';
                    setTimeout(() => {
                        $warning = '';
                    }, 3000);
                    return
                }
                argVal = `performance=${seconds}`
            }
        } else if (points != '') {
            argVal = `points=${points}`
        }
        
        fetch(`https://kaz3cn5qqtkrdwxnvpey7eex5q0mhokf.lambda-url.us-east-1.on.aws/?event=${event}&${argVal}`)
        .then(response => {
            response.json().then(data => {
                if (response.status != 200) {
                    $warning = data
                    setTimeout(() => {
                        $warning = ''
                    }, 3000)
                    return
                }
                let evt = formatEvent(event)
                if (performance == '') {
                    if (!FieldEvents.includes(event)) {
                        data = formatSeconds(data)
                    }
                    $results = [...$results, {event: evt, performance: data, points: points}]
                } else if (points == '') {
                    $results = [...$results, {event: evt, performance: performance, points: data}]
                }
            })
        }).catch(error => {
            console.log(error);
        });
    }

    function toggleField() {
        includeField = !includeField
    }
</script>

<div class='container'>
    <select bind:value={event} >
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
        {#if includeField}
            <option value="HJ">High Jump</option>
            <option value="PV">Pole Vault</option>
            <option value="LJ">Long Jump</option>
            <option value="TJ">Triple Jump</option>
            <option value="SP">Shot Put</option>
            <option value="DT">Discus</option>
            <option value="HT">Hammer Throw</option>
            <option value="JT">Javelin</option>
            <option value="Decathlon">Decathlon</option>
        {/if}
    </select>

    <input id='result-input' type="text" placeholder="Result (hh:mm:ss{includeField ? ' or metres': ''})" bind:value={performance}>

    <input type="text" placeholder='Points' bind:value={points}>

    <button on:click={addEvent}>+</button>
      
    <label class="switch">
        <input on:change={toggleField} type="checkbox">
        <span class="slider round"></span>
    </label>

    <p class='mb0 mt03 ml05'>Include field events</p>
      
</div>
  

<style>

    .mb0 {
        margin-bottom: 0;
    }

    .mt03 {
        margin-top: 0.33em;
    }

    .ml05 {
        margin-left: 0.5em;
    }

    .container {
        display: flex;
        flex-direction: row;
        padding: 1em;
        padding-left: 2em;
    }

    #result-input {
        width: 15em;
    }

    select, input {
        margin-right: 2em;
        padding: 0.5em;
    }

    .switch {
        position: relative;
        display: inline-block;
        width: 60px;
        height: 34px;
        margin-left: 2em;
    }

    .switch input { 
        opacity: 0;
        width: 0;
        height: 0;
    }

    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        -webkit-transition: .4s;
        transition: .4s;
    }

    .slider:before {
        position: absolute;
        content: "";
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
    }

    input:checked + .slider {
        background-color: #2196F3;
    }

    input:focus + .slider {
        box-shadow: 0 0 1px #2196F3;
    }

    input:checked + .slider:before {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
    }

    /* Rounded sliders */
    .slider.round {
        border-radius: 34px;
    }

    .slider.round:before {
        border-radius: 50%;
    }
</style>