<script>
    // @ts-nocheck

    import { warning } from "../store.js";
    import { formatSeconds, formatEvent, FieldEvents } from "../utils.js";

    export let result = {
        gender: "",
        season: "",
        event: "",
        performance: "",
        points: "",
    };

    function addEvent(e) {
        fetch(
            `https://kaz3cn5qqtkrdwxnvpey7eex5q0mhokf.lambda-url.us-east-1.on.aws/?gender=${result.gender}&season=${result.season}&event=${e.target.value}&points=${result.points}`
        )
            .then((response) => {
                response.json().then((data) => {
                    if (response.status != 200) {
                        $warning = data;
                        setTimeout(() => {
                            $warning = "";
                        }, 3000);
                        return;
                    }
                    let className = `${e.target.value.split(" ").join("")}-${
                        result.points
                    }`;
                    let firstRow =
                        e.target.parentElement.children[0].children[1];
                    for (let i = 0; i < firstRow.children.length; i++) {
                        if (
                            firstRow.children[i].classList.contains(className)
                        ) {
                            $warning = "This distance has already been added.";
                            setTimeout(() => {
                                $warning = "";
                            }, 3000);
                            e.target.children[0].selected = true;

                            return;
                        }
                    }
                    let event = document.createElement("td");
                    event.innerHTML = formatEvent(e.target.value);
                    event.classList.add(className);
                    event.addEventListener("click", function () {
                        removeColumn(event);
                    });
                    firstRow.appendChild(event);

                    let secondRow =
                        e.target.parentElement.children[0].children[2];
                    let performance = document.createElement("td");

                    if (!FieldEvents.includes(e.target.value)) {
                        performance.innerHTML = formatSeconds(data);
                    } else {
                        performance.innerHTML = data;
                    }
                    performance.classList.add(className);
                    secondRow.appendChild(performance);

                    e.target.children[0].selected = true;
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function removeColumn(e) {
        let performances = e.parentElement.parentElement.children[2].children;
        for (let i = 0; i < performances.length; i++) {
            if (performances[i].classList.contains(e.classList[0])) {
                performances[i].remove();
                break;
            }
        }
        e.remove();
    }
</script>

<div class="results-row container">
    <table>
        <caption>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-mouse-events-have-key-events -->
            <span
                on:mouseover={(e) => {
                    e.target.style.color = "red";
                    document.body.style.cursor = "pointer";
                }}
                on:mouseout={(e) => {
                    e.target.style.color = window.matchMedia(
                        "(prefers-color-scheme: dark)"
                    ).matches
                        ? "white"
                        : "black";
                    document.body.style.cursor = "auto";
                }}
                on:click={(e) =>
                    e.target.parentElement.parentElement.parentElement.remove()}
                style="float: left; margin-right: 1em;"
            >
                ✕
            </span>
            {result.gender == "mens" ? "Men's" : "Women's"}
            {result.season.charAt(0).toUpperCase() + result.season.slice(1)}
        </caption>
        <tr>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <td
                on:click={(e) =>
                    e.target.parentElement.parentElement.parentElement.remove()}
                >Points</td
            >
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <td
                class={result.event.split(" ").join("") + "-" + result.points}
                on:click={(e) => removeColumn(e.target)}>{result.event}</td
            >
        </tr>
        <tr>
            <td>{result.points}</td>
            <td class={result.event.split(" ").join("") + "-" + result.points}
                >{result.performance}</td
            >
        </tr>
    </table>
    <select on:change={(e) => addEvent(e)}>
        <option hidden>+</option>
        {#if result.season == "outdoor"}
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
        {#if result.season != "outdoor"}
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
            <option value="HJ">High Jump</option>
            <option value="PV">Pole Vault</option>
            <option value="LJ">Long Jump</option>
            <option value="TJ">Triple Jump</option>
            <option value="SP">Shot Put</option>
            <option value="Pentathlon">Pentathlon</option>
            <option value="Heptathlon">Heptathlon</option>
        {/if}
    </select>
</div>

<style>
    .container {
        display: flex;
        margin-bottom: 2em;
    }

    table {
        padding: 1em;
        border-collapse: collapse;
        width: 12em;
    }

    table tr :global(td) {
        padding: 1em;
        margin: 1em;
        border-right: 1px solid white;
        border-bottom: 1px solid white;
        white-space: nowrap;
        text-align: center;
    }

    table tr :global(td:last-child) {
        border-right: none;
    }

    table tr:last-child :global(td) {
        border-bottom: none;
    }

    caption {
        margin-bottom: 1em;
    }

    select {
        width: 2.5em;
        height: 2.5em;
        appearance: none;
        text-align: center !important;
        border-radius: 0.5em;
        margin-left: 1em;
        margin-top: 4.5em;
    }

    @media (prefers-color-scheme: light) {
        table tr :global(td) {
            border-right: 1px solid black;
            border-bottom: 1px solid black;
        }
    }
</style>
