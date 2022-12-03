<script>
    import ResultRow from './ResultRow.svelte'; 
	import { results } from '../store.js'
    
	let resultList = [];

    results.subscribe(value => {
        resultList = value;
    });
</script>

<div id='results-table' class='container'>
    <div>
        {#each resultList as result}
            <ResultRow result={result}/>
        {/each}
    </div>
</div>

<style>
    .container {
        display: flex;  
        margin-left: 2em;
        margin-top: 1em;
        font-size: 1.25em;
    }
</style>