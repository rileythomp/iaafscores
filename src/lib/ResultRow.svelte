<script>
    import { warning } from '../store.js';

    export let result = {race: '', time: '', points: ''};

    function addRace(e) {
        fetch(`https://kaz3cn5qqtkrdwxnvpey7eex5q0mhokf.lambda-url.us-east-1.on.aws/?race=${e.target.value}&points=${result.points}`)
        .then(response => response.json())
        .then(data => {
            let className = `${e.target.value}-${result.points}`
            let firstRow = e.target.parentElement.children[0].children[0]
            for (let i = 0; i < firstRow.children.length; i++) {
                if (firstRow.children[i].classList.contains(className)) {
                    $warning = 'This distance has already been added.'
                    setTimeout(() => {
                        $warning = ''
                    }, 3000);
                    e.target.children[0].selected = true

                    return
                }
            }
            let race = document.createElement('td')
            if (e.target.value == 'HalfMarathon') {
                race.innerHTML = 'Half Marathon'
            } else {
                race.innerHTML = e.target.value
            }
            race.classList.add(className)
            race.addEventListener('click', function() {
                let times = race.parentElement.parentElement.children[1].children
                for (let i = 0; i < times.length; i++) {
                    if (times[i].classList.contains(race.classList[0])) {
                        times[i].remove()
                        break
                    }
                }
                race.remove()

            })
            firstRow.appendChild(race)

            let secondRow = e.target.parentElement.children[0].children[1]
            let time = document.createElement('td')
            let hours = Math.floor(data / 3600)
            let minutes = Math.floor((data % 3600) / 60)
            let seconds = data % 60
            if (hours > 0) {
                seconds = Math.round(seconds)
                time.innerHTML = `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
            } else if (minutes > 0) {
                seconds = Math.round(seconds)
                time.innerHTML = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
            } else {
                time.innerHTML = `${seconds.toFixed(2)}`
            }
            time.classList.add(className)
            secondRow.appendChild(time)
            
            e.target.children[0].selected = true
        }).catch(error => {
            console.log(error);
        });
    }

    function removeColumn(e) {
        let times = e.target.parentElement.parentElement.children[1].children
        for (let i = 0; i < times.length; i++) {
            if (times[i].classList.contains(e.target.classList[0])) {
                times[i].remove()
                break
            }
        }
        e.target.remove()
    }
</script>

<div class='results-row container'>
<table>
    <tr>
       <td on:click={(e) => e.target.parentElement.parentElement.parentElement.remove()}>Points</td>
       <td class="{result.race + '-' + result.points}" on:click={(e) => removeColumn(e)}>{result.race}</td>
    </tr>
    <tr>
        <td>{result.points}</td>
        <td class="{result.race + '-' + result.points}">{result.time}</td>
    </tr>
</table>
<select on:change={(e) => addRace(e)}>
    <option hidden>+</option>
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
</div>

<style>
    .container {
        display: flex;  
        margin-bottom: 2em;
    }

    table {
        padding: 1em;
        border-collapse: collapse;
    }

    table tr :global(td) {
        padding: 1em;
        margin: 1em;
        border-right: 1px solid white;
        border-bottom: 1px solid white;
    }

    table tr :global(td:last-child) {
        border-right: none;
    }

    table tr:last-child :global(td) {
        border-bottom: none;
    }

    select {
        width: 2.5em;
        height: 2.5em;
        appearance: none;
        text-align: center !important;
        border-radius: 0.5em;
        margin-left: 1em;
        margin-top: 1em;
    }

</style>