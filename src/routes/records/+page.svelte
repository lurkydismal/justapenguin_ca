<script>
import { Match, Pager } from '$lib'

/** @type {import('./$types').PageServerData} */
export let data
</script>

{#each data.records as record}
	<div class="inner">
		<Match {record} />
	</div>
{/each}

<div class="pager">
	<Pager currentPage={data.pageNum}/>
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
