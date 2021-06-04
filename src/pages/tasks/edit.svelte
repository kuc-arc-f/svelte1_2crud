<script>
import {link} from 'svelte-spa-router'
import Dexie from 'dexie';  
import LibTask from '../../lib/LibTask';
import LibDexie from '../../lib/LibDexie';
//
var config = LibTask.get_const()
var db = new Dexie( config.DB_NAME );
db.version(config.DB_VERSION).stores( config.DB_STORE );  
export let params = Params

const  get_item = async function (db, id){
  var item = await db.tasks.get(parseInt(id) );
  return item
}
async function handleClick() {
//  alert('clicked')
  await save_item(db)
}
async function handleClickDelete() {
console.log('handleClickDelete')
  await delete_item(db)
}
async function delete_item(db){
  try {
    await db.tasks.delete(parseInt(params.id) );
    window.location.href = '/#/tasks/'
  } catch (error) {
    console.error(error);
  }
}
async function save_item(db){
  try {
    var elemTitle = document.getElementById('title');
    var elemContent = document.getElementById('content');
    var item = {
      title: elemTitle.value,
      content: elemContent.value,
      created_at: new Date(),
    }
console.log(item)
    await db.tasks.update(parseInt(params.id) , {
      title: elemTitle.value,
      content: elemContent.value,
    });
    window.location.href = '/#/tasks/'
  } catch (error) {
    console.error(error);
  }    
}
</script>

<!-- -->
<div class="container">
	<h3>Tasks - edit</h3>
  ID : {params.id}
  <hr />
  {#await get_item(db , params.id) }
  <p>Noow Loading.</p>
  {:then item}
    <div class="form-group">
      <label>Title:</label>
      <input type="text" class="form-control" name="title" id="title" 
      value={item.title} />
      <label>content:</label>
      <input type="text" class="form-control" name="content" id="content"
      value={item.content} />
      <hr />
      <button on:click={handleClick} class="btn btn-primary">Save</button>
      <hr />
      <button on:click={handleClickDelete} class="btn btn-outline-danger">Delete
      </button>
    </div>
  {/await}
  
  <hr />
</div>
