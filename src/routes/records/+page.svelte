<script>
import { Match, Pager } from '$lib'

// i need to figure out how jsdoc comments work to keep this type safe
export let data
$: ( data ) 
let { results, page } = data
</script>

{#each results as result}
	<div class="inner">
		<Match {result} />
	</div>
{/each}

<div class="pager">
	<Pager currentPage={page}/>
</div>

<style>
.inner {
	margin: 5px;
	margin-top: 1em;
	display: flex;
	justify-content: center;
}

.pager {
	margin: auto;
}
</style>
