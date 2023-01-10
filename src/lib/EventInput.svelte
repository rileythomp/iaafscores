<script>
    import { results, warning, info } from '../store.js';
    import { formatSeconds, formatEvent, getSecondsFromTime, FieldEvents, Thons } from '../utils.js';

    let performance = '';
    let points = '';
    let event = '100m';

    let includeField = false;
    let includeRoad = false;
    let gender = 'mens';
    let season = 'outdoor';

    function mobileToggle(e) {
        let genderSeason = e.target.value
        let parts = genderSeason.split('-')
        gender = parts[0]
        season = parts[1]
    }

    function addEvent() {
        let argVal;
        if (performance != '' && points != '') {
            $warning = 'Must enter only one of a result or score.';
            setTimeout(() => {
                $warning = '';
            }, 3000);
            return
        } else if (performance == '' && points == '') {
            $warning = 'Must enter one of a result or score.';
            setTimeout(() => {
                $warning = '';
            }, 3000);
            return
        } else if (performance != '') {
            performance = performance.replace(/^0+/, '')
            if (FieldEvents.includes(event)) {
                argVal = `performance=${performance}`
            } else {
                let seconds = getSecondsFromTime(performance)
                if (seconds == 0) {
                    $warning = 'Time must be formatted as hh:mm:ss.xx.';
                    setTimeout(() => {
                        $warning = '';
                    }, 3000);
                    return
                }
                argVal = `performance=${seconds}`
            }
        } else if (points != '') {
            points = points.replace(/^0+/, '')
            argVal = `points=${points}`
        }

        fetch(`https://kaz3cn5qqtkrdwxnvpey7eex5q0mhokf.lambda-url.us-east-1.on.aws/?gender=${gender}&season=${season}&event=${event}&${argVal}`)
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
                    $results = [...$results, {event: evt, performance: data, points: points, gender: gender, season: season}]
                } else if (points == '') {
                    $results = [...$results, {event: evt, performance: performance, points: data, gender: gender, season: season}]
                }
                performance = ''
                points = ''
            })
            .catch(err => {
                console.log(err)
                $warning = 'Unexpected error calculating points.'
                setTimeout(() => {
                    $warning = ''
                }, 3000)
                return
            })
        }).catch(error => {
            console.log(error);
        });
    }

    function toggleField() {
        includeField = !includeField
    }

    function toggleRoad() {
        includeRoad = !includeRoad
    }

    function toggleGender() {
        gender = gender == 'mens' ? 'womens' : 'mens'
    }

    function toggleSeason() {
        season = season == 'indoor' ? 'outdoor' : 'indoor'
        event = season == 'indoor' ? '50m' : '100m'
    }
</script>

<div class='container' id='inputs'>
    <select bind:value={event} >
        {#if season == 'outdoor'}
            <option value="100m">100m</option>
            <option value="200m">200m</option>
            <option value="300m">300m</option>
            <option value="400m">400m</option>
            <option value="500m">500m</option>
            <option value="110mH">110mH</option>
            <option value="400mH">400mH</option>
            <option value="600m">600m</option>
            <option value="800m">800m</option>
            <option value="1000m">1000m</option>
            <option value="1500m">1500m</option>
            <option value="Mile">Mile</option>
            <option value="2000m">2000m</option>
            <option value="2000mSC">2000m SC</option>
            <option value="3000m">3000m</option>
            <option value="3000mSC">3000m SC</option>
            <option value="2Miles">2 Miles</option>
            <option value="5000m">5000m</option>
            <option value="10000m">10,000m</option>
            <option value="4x100m">4x100m</option>
            <option value="4x200m">4x200m</option>
            <option value="4x400m">4x400m</option>
            {#if includeRoad}
                <option value="5km">Road 5km</option>
                <option value="10km">Road 10km</option>
                <option value="15km">15km</option>
                <option value="10Miles">10 Miles</option>
                <option value="20km">20km</option>
                <option value="HalfMarathon">Half Marathon</option>
                <option value="25km">25km</option>
                <option value="30km">30km</option>
                <option value="Marathon">Marathon</option>
                <option value="100km">100km</option>
            {/if}
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
                <option value="Heptathlon">Heptathlon</option>
            {/if}
        {/if}
        {#if season != 'outdoor'}
            <option value="50m">50m</option>
            <option value="55m">55m</option>
            <option value="60m">60m</option>
            <option value="50mH">50mH</option>
            <option value="55mH">55mH</option>
            <option value="60mH">60mH</option>
            <option value="200m">200m</option>
            <option value="300m">300m</option>
            <option value="400m">400m</option>
            <option value="500m">500m</option>
            <option value="600m">600m</option>
            <option value="800m">800m</option>
            <option value="1000m">1000m</option>
            <option value="1500m">1500m</option>
            <option value="Mile">Mile</option>
            <option value="2000m">2000m</option>
            <option value="3000m">3000m</option>
            <option value="2Miles">2 Miles</option>
            <option value="5000m">5000m</option>
            <option value="4x200m">4x200m</option>
            <option value="4x400m">4x400m</option>
            {#if includeField}
                <option value="HJ">High Jump</option>
                <option value="PV">Pole Vault</option>
                <option value="LJ">Long Jump</option>
                <option value="TJ">Triple Jump</option>
                <option value="SP">Shot Put</option>
                <option value="Pentathlon">Pentathlon</option>
                <option value="Heptathlon">Heptathlon</option>
            {/if}
        {/if}
    </select>

    <input id='result-input' type="text" placeholder="Result ({Thons.includes(event) ? 'points': FieldEvents.includes(event) ? 'meters' : 'hh:mm:ss.xx'})" bind:value={performance}>
    <p style="margin-left: 1em; margin-right: 1em; font-size: 1.5em;">or</p>
    <input type="text" placeholder='Points' bind:value={points}>

    <button on:click={addEvent}>+</button>

    <p id='info-button' on:click={()=>$info = true} on:mouseover={(e) => {e.target.style.fontWeight = 'bold'}} on:mouseout={(e) => {e.target.style.fontWeight='normal'}}>
        <i class="far fa-question-circle"></i>
    </p>
      
</div>

<div class="container toggles desktop">
    <p class="mt055" style="margin-right: 0.5em;">Mens</p>

    <label on:change={toggleGender} class="switch">
        <input type="checkbox">
        <span class="slider round"></span>
    </label>

    <p style="margin-right: 1em;" class='mb0 mt06 ml05'>Womens</p>

    <p class="mt055" style="margin-right: 0.5em; margin-left: 3em;">Outdoor</p>

    <label on:change={toggleSeason} class="switch">
        <input type="checkbox">
        <span class="slider round"></span>
    </label>

    <p style="margin-right: 1em;" class='mb0 mt06 ml05'>Indoor</p>

    <label style="margin-left: 3em;" class="switch">
        <input on:change={toggleRoad} type="checkbox">
        <span class="slider round"></span>
    </label>

    <p class='mb0 mt06 ml05'>Include road events</p>

    <label style="margin-left: 3em;" class="switch">
        <input on:change={toggleField} type="checkbox">
        <span class="slider round"></span>
    </label>

    <p class='mb0 mt06 ml05'>Include field events</p>
</div>

<div class="container toggles mobile">
    <select on:change={mobileToggle} >
        <option selected value="mens-outdoor">Men's Outdoor</option>
        <option value="mens-indoor">Men's Indoor</option>
        <option value="womens-outdoor">Women's Outdoor</option>
        <option value="womens-indoor">Women's Indoor</option>
    </select>
</div>
  

<style>

    .mb0 {
        margin-bottom: 0;
    }

    .mt06 {
        margin-top: 0.6em;
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
        margin-right: 0;
    }

    select, input {
        margin-right: 2em;
        padding: 0.75em;
        font-size: 1.5em;
    }

    select {
        width: 10em;
    }

    button {
        width: 2.25em;
        font-size: 2em;
        margin-right: 1.5em;
    }

    .switch {
        margin-top: 0.35em;
        position: relative;
        display: inline-block;
        width: 60px;
        height: 34px;
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

    .toggles p {
        font-size: 1.5em;
    }

    #info-button {
        display: flex;
        align-items: center;
        margin: 0;
        font-size: 3em;
    }

    .mobile {
        display: none;
    }

    .mt055 {
        margin-top: 0.55em;
    }

    @media (max-width: 1024px) {
        #inputs {
            padding: 0;
            margin-top: 1em;
            display: block;
        }

        #inputs select, input {
            padding: 0.25em;
        }

        #inputs select {
            width: 85vw !important;
            margin: 0;
            margin-bottom: 1em;
        }

        #inputs input {
            width: 77vw !important;
            margin: 0;
            margin-bottom: 1em;
        }

        #inputs p {
            display: inline;
        }

        #inputs button {
            height: 1.5em;
            margin-right: 1em;
            width: 65vw;
        }

        .desktop {
            display: none;
        }

        .mobile {
            display: block;
            padding-left: 0;
        }
    }
</style>