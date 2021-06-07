<script>
import {link} from 'svelte-spa-router'
import Dexie from 'dexie';  
import LibTask from '../../lib/LibTask';
import LibDexie from '../../lib/LibDexie';
//
const  get_items = async function (db){
  var items = await db.books.toArray()
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
	<h3>Books - index</h3>
  <a href="/books/create" use:link class="btn btn-primary">Create
  </a>
  <hr />
  {#await get_items(db) }
  <p>Noow Loading.</p>
  {:then items}
    {#each items as item}
    <h3>{item.title}
    </h3>
    <p>ID : {item.id}
      <a href={`/books/edit/${item.id}`} use:link class="ml-2 btn btn-outline-primary">
        Edit</a>
    </p>
    <hr />
    {/each}
  {/await}
</div>
