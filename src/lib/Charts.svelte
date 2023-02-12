<script>
    // @ts-nocheck
    import { GoogleCharts } from "google-charts";

    let search = '';
    let event = '100';
    let season = 'outdoor';

    let fieldEvents = ['HJ', 'PV', 'LJ', 'TJ', 'SP', 'DT', 'HT', 'JT', 'DEC', 'HEP', 'PEN'];

    function timeToSeconds(time) {
        return time.split(":").reverse().reduce((total, time, i) => total + Number(time) * 60 ** i, 0);
    }

    function secondsToTime(seconds) {
        let mins = Math.floor(seconds/60);
        let secs = seconds%60;
        return `${mins > 0 ? mins+':' : ''}${mins > 0 && secs < 10 ? '0' : ''}${secs.toFixed(2)}`;

    }

    function drawChart() {
        fetch(`http://localhost:8000?search=${search}&event=${event}&season=${season}`)
        .then(response => {
            response.json().then(res => {
                let data = GoogleCharts.api.visualization.arrayToDataTable(res.data);
                let options = {
                    title: `${res.name}'s ${res.discipline} ${['DEC', 'HEP', 'PEN'].includes(event) ? 'Points' : 'Distances'}`,
                    titleTextStyle: {fontSize: 24},
                    curveType: "none",
                    legend: {position: "none"},
                };
                if (!fieldEvents.includes(event)) {
                    data = [res.data[0]]
                    for (let result of res.data.slice(1)) {
                        data.push([result[0], timeToSeconds(result[1].replace('h', ''))])
                    }
                    data = GoogleCharts.api.visualization.arrayToDataTable(data);
                    for (let i = 0; i < data.getNumberOfRows(); i++) {
                        data.setFormattedValue(i, 1, secondsToTime(data.getValue(i, 1)));
                    }
                    let range = data.getColumnRange(1);
                    let gap = (range.max-range.min)/8;
                    let min = Math.floor(100*(range.min-gap))/100;
                    let max = Math.ceil(100*(range.max+gap))/100;
                    let ticks = [];
                    for (let secs = min; secs <= max; secs += gap) {
                        ticks.push({v: secs, f: secondsToTime(secs)});
                    }
                    options.title = `${res.name}'s ${res.discipline} Times`;
                    options.vAxis = {ticks: ticks};
                }
                let chart = new GoogleCharts.api.visualization.LineChart(document.getElementById("progression-chart"));
                chart.draw(data, options);
            })
            .catch(err => {
                console.log(err);
                return;
            })
        }).catch(error => {
            console.log(error);
            return;
        });
    }

    function showChart() {
        GoogleCharts.load(drawChart);
    }
</script>

<div class="container">
    <input bind:value={search} placeholder='Athlete search' type="text">
    <select bind:value={event} name="" id="">
        {#if season == 'outdoor'}
            <option value="100">100m</option>
            <option value="200">200m</option>
            <option value="400">400m</option>
            <option value="110H">110mH</option>
            <option value="400H">400mH</option>
            <option value="800">800m</option>
            <option value="1500">1500m</option>
            <option value="MILE">Mile</option>
            <option value="3KSC">3000m SC</option>
            <option value="5000">5000m</option>
            <option value="10K">10,000m</option>
            <option value="HJ">High Jump</option>
            <option value="PV">Pole Vault</option>
            <option value="LJ">Long Jump</option>
            <option value="TJ">Triple Jump</option>
            <option value="SP">Shot Put</option>
            <option value="DT">Discus</option>
            <option value="HT">Hammer Throw</option>
            <option value="JT">Javelin</option>
            <option value="DEC">Decathlon</option>
            <option value="HEP">Heptathlon</option>
        {/if}
        {#if season != 'outdoor'}
            <option value="60">60m</option>
            <option value="60H">60mH</option>
            <option value="200">200m</option>
            <option value="400">400m</option>
            <option value="800">800m</option>
            <option value="1500">1500m</option>
            <option value="MILE">Mile</option>
            <option value="5000">5000m</option>
            <option value="HJ">High Jump</option>
            <option value="PV">Pole Vault</option>
            <option value="LJ">Long Jump</option>
            <option value="TJ">Triple Jump</option>
            <option value="SP">Shot Put</option>
            <option value="PEN">Pentathlon</option>
            <option value="HEP">Heptathlon</option>
        {/if}
    </select>
    <select bind:value={season} name="" id="">
        <option selected value="outdoor">Outdoor</option>
        <option value="indoor">Indoor</option>
    </select>
    <button on:click={showChart}>Generate Progression Chart</button>
    <div id="progression-chart" />
</div>

<style>
    .container {
        margin-left: 2em;
        padding-top: 0.8em;
    }

    .container > * {
        margin-right: 2em;
    }

    select, input, button {
        padding: 0.75em;
        font-size: 1.75em;
    }

    #progression-chart {
        width: 80vw;
        height: 60vh;
        margin: 0 auto;
        margin-top: 2.5em;
    }
</style>