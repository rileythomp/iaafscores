<script>
    // @ts-nocheck
    import { GoogleCharts } from "google-charts";

    let search = '';
    let event = '100';
    let outdoor = 'outdoor';

    function drawChart() {
        fetch(`http://localhost:8000?search=${search}&event=${event}&outdoor=${outdoor}`)
        .then(response => {
            response.json().then(res => {
                const data = GoogleCharts.api.visualization.arrayToDataTable(res.data);
                var options = {
                    title: `${res.name}'s ${res.discipline} Times`,
                    titleTextStyle: { fontSize: 24 },
                    curveType: "none",
                    legend: { position: "none" },
                };
                var chart = new google.visualization.LineChart(document.getElementById("progression-chart"));
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
        <option selected value="100">100m</option>
        <option value="200">200m</option>
    </select>
    <select bind:value={outdoor} name="" id="">
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