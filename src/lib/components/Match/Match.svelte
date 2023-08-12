<script>
export let result = {id: 0, winner: 'default winner', loser: 'default loser', time: 'time of day'}

let { id, winner, loser, time } = result
</script>

<a href="/records/match/{id}" class="top">
	<div class="wraper">
		<div class="wl">
			<a href="/records/player/{winner}">
				<p style="color: var(--green);"><b>WINNER</b> {winner}</p>
			</a>
			<a href="/records/player/{loser}">
				<p style="color: var(--red);">{loser} <b>LOSER</b></p>
			</a>
		</div>
		<p style="display: flex; justify-content: center;">{time}</p>
	</div>
</a>

<style>
a {
	text-decoration: none;
}
.top {
	display: block;
	width: 100%;
	max-width: 60em;
}

.wraper {
	background-color: var(--background-light);
	color: var(--text-light);

	border-radius: var(--border-radius);
	padding: 0.5em;
	padding-inline: 1em;
}
.wraper:hover {
	background-color: var(--background-light2);
}
:global(body.dark) .wraper {
	background-color: var(--background-dark);
	color: var(--text-dark);
}
:global(body.dark) .wraper:hover {
	background-color: var(--background-dark2);
}

.wl {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
}

b {
	background-color: var(--background-light2);
	border-radius: var(--small-border-radius);
	padding: 4px;
}
:global(body.dark) b {
	background-color: var(--background-dark2);
}
</style>
