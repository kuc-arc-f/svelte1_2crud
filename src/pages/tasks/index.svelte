<script>
import {link} from 'svelte-spa-router'
import Dexie from 'dexie';  
import LibTask from '../../lib/LibTask';
import LibDexie from '../../lib/LibDexie';
//
const  get_items = async function (db){
  var items = await db.tasks.toArray()
  items = LibDexie.get_reverse_items(items)
  return items
}
var config = LibTask.get_const()
var db = new Dexie( config.DB_NAME );
db.version(config.DB_VERSION).stores( config.DB_STORE );  
//export let name;
</script>

<!-- -->
<div class="container">
	<h3>Tasks - index</h3>
  <a href="/tasks/create" use:link class="btn btn-primary">Create
  </a>
  <hr />
  {#await get_items(db) }
  <p>Noow Loading.</p>
  {:then items}
    {#each items as item}
    <h3><a href={`/tasks/show/${item.id}`} use:link>{item.title}</a>
    </h3>
    <p>ID : {item.id}
      <a href={`/tasks/edit/${item.id}`} use:link class="ml-2 btn btn-outline-primary">
        Edit</a>
    </p>
    <hr />
    {/each}
  {/await}
</div>
