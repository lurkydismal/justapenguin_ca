<script>
export let currentPage = 1
</script>

<div>
	<button onclick="window.location.href='?page={currentPage - 1}'">Previous</button>
	<p>{currentPage}</p>
	<button onclick="window.location.href='?page={currentPage + 1}'">Next</button>
</div>

<style>
div {
	display: flex;
	justify-content: center;
}

button {
	background-color: var(--background-light2);
	color: var(--text-light);
	border-radius: var(--small-border-radius);
	padding: 0.5em;
	border: none;
}
:global(body.dark) button {
	background-color: var(--background-dark2);
	color: var(--text-dark);
}

button:hover {
	color: var(--orange);
}
:global(body.dark) button:hover {
	color: var(--orange);
}

p {
	/* background-color: var(--background-light2);
	border-radius: var(--small-border-radius); */
	padding: 0.5em;
	margin-inline: 1em;
}
:global(body.dark) p {
	/* background-color: var(--background-dark2); */
}
</style>
