<script>
import {link} from 'svelte-spa-router'
import Dexie from 'dexie';  
import LibTask from '../../lib/LibTask';
import LibDexie from '../../lib/LibDexie';
//
const  get_items = async function (db){
  var items = await db.tasks.toArray()
  return items
}
var config = LibTask.get_const()
var db = new Dexie( config.DB_NAME );
db.version(config.DB_VERSION).stores( config.DB_STORE );  
//export let name;
</script>

<!-- -->
<div>
	<h3>Tasks - Index</h3>
  <a href="/tasks/create" use:link>Create</a>
  <hr />
  {#await get_items(db) }
  <p>Noow Loading.</p>
  {:then items}
    {#each items as item}
    <p>{item.id} {item.title}
    </p>
    {/each}
  {/await}
</div>
