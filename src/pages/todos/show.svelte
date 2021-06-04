<script>
import {link} from 'svelte-spa-router'
import Dexie from 'dexie';  
import LibTask from '../../lib/LibTask';
import LibDexie from '../../lib/LibDexie';
//
const  get_item = async function (db, id){
  var item = await db.todos.get(parseInt(id) );
  return item
}
var config = LibTask.get_const()
var db = new Dexie( config.DB_NAME );
db.version(config.DB_VERSION).stores( config.DB_STORE );  
export let params = Params
</script>

<!-- -->
<div class="container">
	<h3>todos - show</h3>
  ID : {params.id}
  <hr />
  {#await get_item(db , params.id) }
  <p>Noow Loading.</p>
  {:then item}
    {item.title}<br />
    complete : {item.complete}
    <hr />
    <p>{item.content}</p>
  {/await}

</div>
