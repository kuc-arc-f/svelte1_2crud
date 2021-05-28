<script>
import Dexie from 'dexie';  
import LibTask from '../../lib/LibTask';
import LibDexie from '../../lib/LibDexie';

var config = LibTask.get_const()
var db = new Dexie( config.DB_NAME );
db.version(config.DB_VERSION).stores( config.DB_STORE );  

export let name;
async function handleClick() {
  alert('clicked')
  await add_item()
}
async function add_item(){
  try {
    var item = {
      title: "t1",
      content: "c1",
      created_at: new Date(),
    }
//      console.log(item)
    await db.tasks.add( item )
//    Router.push('/tasks');
  } catch (error) {
    console.error(error);
  }    
}
</script>

<!-- -->
<div>
	<h3>Tasks - create</h3>
  <hr />
  
  <hr />
  <button on:click={handleClick}>Add</button>
</div>
