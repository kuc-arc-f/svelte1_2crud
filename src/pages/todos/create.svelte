<script>
import Dexie from 'dexie';  
import LibTask from '../../lib/LibTask';
import LibDexie from '../../lib/LibDexie';

var config = LibTask.get_const()
var db = new Dexie( config.DB_NAME );
db.version(config.DB_VERSION).stores( config.DB_STORE );  

export let name;
async function handleClick() {
//  alert('clicked')
  await add_item()
}
async function add_item(){
  try {
    var elemTitle = document.getElementById('title');
    var elemContent = document.getElementById('content');
    var item = {
      title: elemTitle.value,
      content: elemContent.value,
      complete : 0,
      created_at: new Date(),
    }
//console.log(item)
    await db.todos.add( item )
    window.location.href = '/#/todos/'
  } catch (error) {
    console.error(error);
  }    
}
</script>

<!-- -->
<div class="container">
	<h3>Todos - Create</h3>
  <hr />
  <div class="form-group">
    <label>Title:</label>
    <input type="text" class="form-control" name="title" id="title" />
    <label>content:</label>
    <input type="text" class="form-control" name="content" id="content" />
  </div>
  <hr />
  <button on:click={handleClick} class="btn btn-primary">Add</button>
</div>
