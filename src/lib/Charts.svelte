<script>
    // @ts-nocheck
    import { GoogleCharts } from "google-charts";

    let showLoading = false;
    let showError = false;
    let errMsg = "";

    let search = "";
    let event = "100";
    let season = "outdoor";

    let fieldEvents = [
        "HJ",
        "PV",
        "LJ",
        "TJ",
        "SP",
        "DT",
        "HT",
        "JT",
        "DEC",
        "HEP",
        "PEN",
    ];

    function timeToSeconds(time) {
        return time
            .split(":")
            .reverse()
            .reduce((total, time, i) => total + Number(time) * 60 ** i, 0);
    }

    function secondsToTime(seconds) {
        let mins = Math.floor(seconds / 60);
        let secs = seconds % 60;
        return `${mins > 0 ? mins + ":" : ""}${
            mins > 0 && secs < 10 ? "0" : ""
        }${secs.toFixed(2)}`;
    }

    function drawChart() {
        fetch(
            `https://f92i1i.deta.dev?search=${search}&event=${event}&season=${season}`
        )
            .then((response) => {
                response
                    .json()
                    .then((res) => {
                        let data =
                            GoogleCharts.api.visualization.arrayToDataTable(
                                res.data
                            );
                        let options = {
                            title: `${res.name}'s ${res.discipline} ${
                                ["DEC", "HEP", "PEN"].includes(event)
                                    ? "Points"
                                    : "Distances"
                            }`,
                            titleTextStyle: { fontSize: 24 },
                            curveType: "none",
                            legend: { position: "none" },
                        };
                        if (!fieldEvents.includes(event)) {
                            data = [res.data[0]];
                            for (let result of res.data.slice(1)) {
                                data.push([
                                    result[0],
                                    timeToSeconds(result[1].replace("h", "")),
                                ]);
                            }
                            data =
                                GoogleCharts.api.visualization.arrayToDataTable(
                                    data
                                );
                            for (let i = 0; i < data.getNumberOfRows(); i++) {
                                data.setFormattedValue(
                                    i,
                                    1,
                                    secondsToTime(data.getValue(i, 1))
                                );
                            }
                            let range = data.getColumnRange(1);
                            let gap = (range.max - range.min) / 8;
                            let min = Math.floor(100 * (range.min - gap)) / 100;
                            let max = Math.ceil(100 * (range.max + gap)) / 100;
                            let ticks = [];
                            for (let secs = min; secs <= max; secs += gap) {
                                ticks.push({ v: secs, f: secondsToTime(secs) });
                            }
                            options.title = `${res.name}'s ${res.discipline} Times`;
                            options.vAxis = { ticks: ticks };
                        }
                        let chart =
                            new GoogleCharts.api.visualization.LineChart(
                                document.getElementById("progression-chart")
                            );
                        showLoading = false;
                        chart.draw(data, options);
                    })
                    .catch((err) => {
                        console.log(err);
                        showLoading = false;
                        showError = true;
                        errMsg = `Sorry, we couldn't find any results for ${search} in the ${event}`;
                        return;
                    });
            })
            .catch((error) => {
                console.log(error);
                return;
            });
    }

    function showChart() {
        document.getElementById("progression-chart").innerHTML = "";
        showLoading = true;
        showError = false;
        errMsg = "";
        GoogleCharts.load(drawChart);
    }
</script>

<div class="container">
    <input bind:value={search} placeholder="Athlete search" type="text" />
    <select bind:value={event} name="" id="">
        {#if season == "outdoor"}
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
        {#if season != "outdoor"}
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
    <button on:click={showChart}>Generate Chart</button>
    {#if showLoading}
        <div class="lds-roller">
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
        </div>
        <p class="warning-msg">This may take up to a few seconds</p>
    {/if}
    {#if showError}
        <p class="warning-msg">{errMsg}</p>
    {/if}
    <div id="progression-chart" />
</div>

<style>
    .container {
        margin-left: 2em;
        padding-top: 0.8em;
    }

    select,
    input,
    button {
        padding: 0.75em;
        font-size: 1.75em;
        margin-right: 2em;
    }

    #progression-chart {
        width: 80vw;
        height: 60vh;
        margin: 0 auto;
        margin-top: 2.5em;
    }

    .warning-msg {
        font-size: 2em;
        text-align: center;
        margin-top: 2em;
    }

    .lds-roller {
        display: block;
        position: relative;
        width: 80px;
        height: 80px;
        margin: 0 auto;
        margin-top: 5em;
    }
    .lds-roller div {
        animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        transform-origin: 40px 40px;
    }
    .lds-roller div:after {
        content: " ";
        display: block;
        position: absolute;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: #fff;
        margin: -4px 0 0 -4px;
    }
    .lds-roller div:nth-child(1) {
        animation-delay: -0.036s;
    }
    .lds-roller div:nth-child(1):after {
        top: 63px;
        left: 63px;
    }
    .lds-roller div:nth-child(2) {
        animation-delay: -0.072s;
    }
    .lds-roller div:nth-child(2):after {
        top: 68px;
        left: 56px;
    }
    .lds-roller div:nth-child(3) {
        animation-delay: -0.108s;
    }
    .lds-roller div:nth-child(3):after {
        top: 71px;
        left: 48px;
    }
    .lds-roller div:nth-child(4) {
        animation-delay: -0.144s;
    }
    .lds-roller div:nth-child(4):after {
        top: 72px;
        left: 40px;
    }
    .lds-roller div:nth-child(5) {
        animation-delay: -0.18s;
    }
    .lds-roller div:nth-child(5):after {
        top: 71px;
        left: 32px;
    }
    .lds-roller div:nth-child(6) {
        animation-delay: -0.216s;
    }
    .lds-roller div:nth-child(6):after {
        top: 68px;
        left: 24px;
    }
    .lds-roller div:nth-child(7) {
        animation-delay: -0.252s;
    }
    .lds-roller div:nth-child(7):after {
        top: 63px;
        left: 17px;
    }
    .lds-roller div:nth-child(8) {
        animation-delay: -0.288s;
    }
    .lds-roller div:nth-child(8):after {
        top: 56px;
        left: 12px;
    }
    @keyframes lds-roller {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    @media (max-width: 1023px) {
        select,
        input,
        button {
            padding: 0.25em;
            margin-bottom: 0.5em;
            margin-right: 0;
            width: 88.5vw;
        }

        input {
            width: 86.5vw;
        }

        .container {
            margin-left: 0;
        }

        #progression-chart {
            width: 90vw;
            margin-top: 1em;
        }

        .container {
            text-align: center;
        }
    }

    @media (max-width: 767px) {
        input {
            width: 85vw;
        }
    }
</style>
