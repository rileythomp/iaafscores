<script>
	import EventInput from './lib/EventInput.svelte';
	import Header from './lib/Header.svelte';
    import ResultsTable from './lib/ResultsTable.svelte';
	import { warning } from './store.js'

	let warningMessage;

	warning.subscribe(value => {
		warningMessage = value
	});
</script>

<main>
	<Header />

	<EventInput />

	<ResultsTable />
	{#if warningMessage != ''}
		<div id="warning">
			<p>
				{warningMessage}
			</p>
		</div>
	{/if}
</main>

<style>
	#warning {
		border: 0.5em solid lightgrey;
		border-radius: 1em;
		width: 20em;
		height: 10em;
		background-color: white;
		position: absolute;
		margin: 0 auto;
		top: 3em;
		left: 50%;
		transform: translateX(-50%);
		text-align: center;
	}

	#warning p {
		color: black;
	}
</style>
