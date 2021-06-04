<script>
import Router from 'svelte-spa-router'
import Navi from './components/Navi.svelte'
import index from './pages/index.svelte'
import test from  './pages/test.svelte'
import tasks from './pages/tasks/index.svelte'
import tasks_create from './pages/tasks/create.svelte'
import tasks_show from './pages/tasks/show.svelte'
import tasks_edit from './pages/tasks/edit.svelte'

export const routes = {
  '/': index,
  '/test': test,
  '/tasks/': tasks,
  '/tasks/create': tasks_create,
  '/tasks/show/:id': tasks_show,
  '/tasks/edit/:id': tasks_edit,
}	
</script>

<!-- main -->
<main>
  <Navi />
  <Router {routes} />
</main>

<style>
  /*
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
  */
</style>