<script>
	import { browser } from '$app/environment'
    import { ThemeToggle } from '$lib';

	if (browser) {
		if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && !localStorage.getItem('theme')) {
			localStorage.setItem('theme', 'dark')
		}

		if (localStorage.getItem('theme') === 'light') {
			document.body.classList.remove('dark')
		}
		if (localStorage.getItem('theme') === 'dark') {
			document.body.classList.add('dark')
		}
	}
</script>

<nav>
	<div>
		<p>TODO: crumbs</p>
	</div>

	<div>
		<a href="/">HOME</a>
		<a href="/records">RECORDS</a>
		<a href="/components">COMPONENTS</a>

		<div style="margin-left: 2em;">
			<ThemeToggle/>
		</div>
	</div>
</nav>

<slot/>

<style>
	:root {
		--background-dark: #222425;
		--background-dark2: color-mix(in srgb, var(--background-dark) 80%, black);
		--text-dark: #ffffff;
		--background-light: #ebebeb;
		--background-light2: color-mix(in srgb, var(--background-light) 90%, black);
		--text-light: #000000;

		--orange: #ff6b0f;
		--blue: #51ade6;
		--green: #1ed665; /* #3fe47e */
		--red: #ec2a2a;

		--light-blue: #82c4ed;
		--light-green: #a1f2c0;

		--border-radius: 15px;
		--small-border-radius: 5px;
	}

	:global(body) {
		/* transition: background-color 0.3s; */
		/* transition: 0.3s; */
		background-color: var(--background-light);
		color: var(--text-light);
	}
	:global(body.dark) {
		background-color: var(--background-dark);
		color: var(--text-dark);
	}
	
	nav {
		display: flex;
		max-width: 90rem;
		justify-content: space-between;
		align-items: center;
		padding: 0.5em;
		padding-inline: 1em;
		margin: auto; /* the margin on the sides can become 0 when the page is small enough */
		margin-top: 1em;
		border-radius: var(--border-radius);
		background-color: var(--background-light2);
	}
	:global(body.dark) nav {
		background-color: var(--background-dark2);
	}
	nav > div:nth-child(1) { }
	nav > div:nth-child(2) {
		display: flex;
		align-items: center;
		flex-direction: row;
	}
	nav > div:nth-child(2) > a{
		padding-left: 1em;
	}

	a {
		color: var(--orange);
	}
</style>
