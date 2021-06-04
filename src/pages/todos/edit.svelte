<script>
import {link} from 'svelte-spa-router'
import Dexie from 'dexie';  
import LibTask from '../../lib/LibTask';
import LibTodos from '../../lib/LibTodos';
import LibDexie from '../../lib/LibDexie';
//
var todo_item = {
  title: '', content:'',complete: 0,
}
export let params = Params , complete_items = [] , item = todo_item
var config = LibTask.get_const()
var db = new Dexie( config.DB_NAME );
db.version(config.DB_VERSION).stores( config.DB_STORE );  
complete_items = LibTodos.get_complete_items()
//console.log(complete_items)

function set_complete(item){
  console.log(item)
  var elemComplete = document.getElementById('complete');
  elemComplete.value = item.complete
  var elemTitle = document.getElementById('title');
  var elemContent = document.getElementById('content');
  elemTitle.value =item.title
  elemContent.value = item.content
}
const  get_item = async function (db, id){
  var item = await db.todos.get(parseInt(id) );
  console.log(item)
  item = item
  set_complete(item)
  return item
}
get_item(db, params.id)

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
    await db.todos.delete(parseInt(params.id) );
    window.location.href = '/#/todos/'
  } catch (error) {
    console.error(error);
  }
}
async function save_item(db){
  try {
    var elemTitle = document.getElementById('title');
    var elemContent = document.getElementById('content');
    var elemComplete = document.getElementById('complete');
    await db.todos.update(parseInt(params.id) , {
      title: elemTitle.value,
      content: elemContent.value,
      complete: elemComplete.value,
    });
    window.location.href = '/#/todos/'
  } catch (error) {
    console.error(error);
  }    
}
</script>

<!-- -->
<div class="container">
	<h3>todos - Edit</h3>
  ID : {params.id}
  <hr />
  <div class="form-group">
    <label>Title:</label>
    <input type="text" class="form-control" name="title" id="title" 
    value={item.title} />
    <label>content:</label>
    <input type="text" class="form-control" name="content" id="content"
    value={item.content} />
    <hr />
    Complete:
    <select id="complete" name="complete"
      class="form-select mt-2" value={item.complete}>
      {#each complete_items as item}
        <option value={item.value}>{item.name}</option>
      {/each}
    </select>
    <hr />
    <button on:click={handleClick} class="btn btn-primary">Save</button>
    <hr />
    <button on:click={handleClickDelete} class="btn btn-outline-danger">Delete
    </button>
  </div>  
  
  <hr />
</div>
