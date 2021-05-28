<script>
	import {link} from 'svelte-spa-router'
	export let name;
</script>

<div>
	<h1>Hello 456</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> 
		to learn how to build Svelte apps.
	</p>
	<a href="/test" use:link>test </a>
</div>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>