<script>
import {link} from 'svelte-spa-router'
import { onMount } from 'svelte';
import Dexie from 'dexie';  
import LibTask from '../../lib/LibTask';
import LibTodos from '../../lib/LibTodos';
import LibDexie from '../../lib/LibDexie';
//
var todo_item = {
  title: '', content:''
}
var complete_items = LibTodos.get_complete_items()
console.log(complete_items)
//export let params = Params , complete_items = [] , item = todo_item
export let params = Params , item = todo_item ,selected_complete = complete_items[0]
var config = LibTask.get_const()
var db = new Dexie( config.DB_NAME );
db.version(config.DB_VERSION).stores( config.DB_STORE );  

function set_complete(item){
  selected_complete = LibTodos.get_selected_complete(complete_items , item.complete)
  var elemTitle = document.getElementById('title');
  var elemContent = document.getElementById('content');
  elemTitle.value =item.title
  elemContent.value = item.content
//console.log(selected_complete)
}
const  get_item = async function (db, id){
  var item = await db.todos.get(parseInt(id) );
  item = item
  set_complete(item)
//console.log(item)
  return item
}
get_item(db, params.id)

async function handleClick() {
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
//console.log(parseInt(selected_complete.id))
    await db.todos.update(parseInt(params.id) , {
      title: elemTitle.value,
      content: elemContent.value,
      complete: selected_complete.id,
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
      class="form-select mt-2" bind:value ={selected_complete}>
      {#each complete_items as item}
        <option value={item}>{item.text}</option>
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
