<script>
const toggle = () => {
	window.document.body.classList.toggle('dark')
	let newTheme = localStorage.getItem('theme') === 'dark' ? 'light' : 'dark'
	localStorage.setItem('theme', newTheme)
}
</script>

<button on:click={toggle}>
	toggle theme
</button>

<style>
button {
	background-color: var(--background-dark);
	color: var(--text-dark);

	border: none;
	border-radius: var(--border-radius);
	padding: 0.7em;
	padding-inline: 1em;
}

:global(body.dark) button {
	background-color: var(--background-light);
	color: var(--text-light);
}
</style>
