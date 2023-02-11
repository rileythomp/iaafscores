<script>
// @ts-nocheck
	import { Router, Route } from "svelte-routing";	
	import { info, warning } from './store.js';
	import Header from './lib/Header.svelte';
	import Scores from './lib/Scores.svelte';
    import Charts from './lib/Charts.svelte';

	let warningMessage;

	let infoMessage;

	warning.subscribe(value => {
		warningMessage = value
	});

	info.subscribe(value => {
		infoMessage = value
	})

	let title = ` _____  ___    ___  ______   _____ _____ ___________ _____ _____\n|_   _|/ _ \\  / _ \\ |  ___| /  ___/  __ \\  _  | ___ \\  ___/  ___|\n  | | / /_\\ \\/ /_\\ \\| |_    \\ \`--.| /  \\/ | | | |_/ / |__ \\ \`--. \n  | | |  _  ||  _  ||  _|    \`--. \\ |   | | | |    /|  __| \`--. \\\n _| |_| | | || | | || |     /\\__/ / \\__/\\ \\_/ / |\\ \\| |___/\\__/ /\n \\___/\\_| |_/\\_| |_/\\_|     \\____/ \\____/\\___/\\_| \\_\\____/\\____/ \n\n Please report any issues at https://github.com/rileythomp/iaafscores/issues \n\n`
	console.log(title)
</script>

<main>
	<Header />

	<Router>
		<Route path="/" component={Scores}/>
		<Route path="/scores" component={Scores}/>
		<Route path="/charts" component={Charts}/>
	</Router>

	{#if warningMessage != ''}
		<div class='popup' id="warning">
			<p>
				{warningMessage}
			</p>
		</div>
	{/if}

	{#if infoMessage}
		<div class='popup' id="info-message">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-mouse-events-have-key-events -->
			<p
			id='close'
			on:mouseover={(e) => {e.target.style.color = 'red'; document.body.style.cursor = "pointer"}}
            on:mouseout={(e) => {e.target.style.color = 'black'; document.body.style.cursor = "auto"}}
			on:click={()=>$info = false}>
				✕
			</p>
			<p id='info-text'>
				This site is for comparing results of different track and field events.
				Every result is assigned a score between 0-1400 which can then be used to compare different events.
				To use it, enter a result to see the corresponding score, or enter a score to see the corresponding result.
				From there you can select other events to see equivalent performances.
				The calculator is based on the IAAF's 2022 <a href="https://worldathletics.org/news/news/scoring-tables-2022" target="blank">scoring tables</a>.
			</p>
		</div>
	{/if}
</main>

<style>
	.popup {
		border: 0.5em solid lightgrey;
		border-radius: 1em;
		width: 35em;
		min-height: 20em;
		background-color: white;
		position: absolute;
		margin: auto;
		right: 0;
		left: 0;
		top: 9em;
		display: flex;
		align-items: center;
		padding: 2em;
		padding-top: 3.5em;
	}

	.popup p {
		color: black;
		font-size: 3em;
		margin: auto;
		line-height: 1.2em;
		text-align: center;
	}

	#close {
		position: absolute;
		top: 0.5em;
		right: 0.5em;
		font-size: 2em;
	}

	#info-text {
		font-size: 1.88em;
	}

    @media (max-width: 1024px) {
		.popup {
			width: 75vw;
			top: 1em;
		}

		#info-text {
			margin-top: 0.5em;
		}
    }
</style>
