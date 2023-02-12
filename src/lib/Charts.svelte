<script>
    // @ts-nocheck
    import { GoogleCharts } from "google-charts";

    let search = '';
    let event = '100';
    let outdoor = 'outdoor';

    function drawChart() {
        let rawData = [
            ["Year", "Sales", "Expenses"],
            ["2004", 1000, 400],
            ["2005", 1170, 460],
            ["2006", 660, 1120],
            ["2007", 1030, 540],
        ];

        fetch(`http://localhost:8000?search=${search}&event=${event}&outdoor=${outdoor}`)
        .then(response => {
            response.json().then(res => {
                console.log(res);
                rawData = res;
                const dataTable = GoogleCharts.api.visualization.arrayToDataTable(rawData);

                var options = {
                    title: "Athlete Progression Over Time",
                    titleTextStyle: {
                        fontSize: 24
                    },
                    curveType: "none",
                    legend: { position: "bottom" },
                };

                var chart = new google.visualization.LineChart(
                    document.getElementById("progression-chart")
                );

                chart.draw(dataTable, options);
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
    <!-- <h1>Sorry, this page is still a work in progress.</h1>
    <br>
    <h1>Make sure to check back later!</h1> -->
    <!-- <div id="curve_chart" style="width: 900px; height: 500px" /> -->
    <!-- <google-chart {data} options={{ ...options }} /> -->
    <!-- <input type="text" name="" id=""> -->
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
    /* h1 {
        font-weight: 600;
        text-align: center;
        font-size: 3em;
    } */

    .container {
        margin-left: 2em;
        /* padding-top: 12em; */
    }

    #progression-chart {
        width: 80vw;
        height: 50vh;
        margin: 0 auto;
    }
</style>