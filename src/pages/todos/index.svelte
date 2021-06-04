<script>
import {link} from 'svelte-spa-router'
import Dexie from 'dexie';  
import LibTask from '../../lib/LibTask';
import LibDexie from '../../lib/LibDexie';
import LibTodos from '../../lib/LibTodos';
//
export let todo_items = [] 
var config = LibTask.get_const()
var db = new Dexie( config.DB_NAME );
db.version(config.DB_VERSION).stores( config.DB_STORE );  

async function handleClickTodos() {
  await get_items(db, 0)
}
async function handleClickComplete() {
//  alert('clicked')
  await get_items(db, 1)
}
const  get_items = async function (db, complete){
  var items = await db.todos.toArray()
  todo_items = LibDexie.get_reverse_items(items)
  todo_items = LibTodos.get_item(todo_items , complete)
  return items
}
get_items(db, 0)
</script>

<!-- -->
<div class="container">
	<h3>Todos - index</h3>
  <a href="/todos/create" use:link class="btn btn-primary">Create
  </a>
  <hr />
  <button on:click={handleClickTodos} class="btn btn-sm btn-outline-primary">
    Not Complete</button>
  <button on:click={handleClickComplete} class="btn btn-sm btn-outline-primary">
    Completed</button>
  <hr />
  {#each todo_items as item}
  <h3><a href={`/todos/show/${item.id}`} use:link>{item.title}</a>
  </h3>
  <p>ID : {item.id}
    <a href={`/todos/edit/${item.id}`} use:link class="ml-2 btn btn-outline-primary">
      Edit</a>
  </p>
  <hr />
  {/each}

</div>
